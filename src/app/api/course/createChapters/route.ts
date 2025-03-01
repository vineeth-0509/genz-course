import { NextResponse } from "next/server";
import { createChapterSchema } from "@/app/validators/course";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gemini";

// /api/course/createChapters
export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { title, units } = createChapterSchema.parse(body);
    type outputUnits = {
      title: string;
      chapters: {
        youtube_search_query: string;
        chapter_title: string;
      }[];
    };

    let output_units: outputUnits = await strict_output(
      "You are an AI capable of curating course content, coming up with relevant chapter titles, and finding relevant youtube videos for each chapter",
      new Array(units.length).fill(
        `It is your job to create a course about ${title}. The user has requested to create chapters for each of the units. Then, for each chapter, provide a detailed youtube search query that can be used to find an informative educationalvideo for each chapter. Each query should give an educational informative course in youtube.`
      ),
      {
        title: "title of the unit",
        chapters:
          "an array of chapters, each chapter should have a youtube_search_query and a chapter_title key in the JSON object",
      }
    );
    const imageSearchTerm = await strict_output(
      "you are an AI capable of finding the most relevant image for a course",
      `Please provide a good image search term for the title of a course about ${title}, This search term will be fed in to the unsplash API, so make sure it is a good search_term that will return good results`,
      {
        image_serach_term: " a good search term for the title of the course",
      }
    );

    console.log(output_units);
    return NextResponse.json({ output_units, imageSearchTerm });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("Invalid body", { status: 400 });
    }
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
