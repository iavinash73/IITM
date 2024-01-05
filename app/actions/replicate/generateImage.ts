import Replicate from "replicate";

export async function generateImage(prompt: string) {
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      });
    /*
    const output = await replicate.run(
        "adirik/realvisxl-v3.0-turbo:6e941e7fe46955afc031f35e84312a792d546b0f434f9008d457eb9deb24575c",
        {
          input: {
            width: 768,
            height: 768,
            prompt: prompt,
            refine: "no_refiner",
            scheduler: "DPM++_SDE_Karras",
            num_outputs: 1,
            guidance_scale: 2,
            apply_watermark: false,
            high_noise_frac: 0.8,
            negative_prompt: "(worst quality, low quality, illustration, 3d, 2d, painting, cartoons, sketch), open mouth",
            prompt_strength: 0.8,
            num_inference_steps: 25
          }
        }
      );
      */
      const output = await replicate.run(
        "lucataco/sdxl-lcm:fbbd475b1084de80c47c35bfe4ae64b964294aa7e237e6537eed938cfd24903d",
        {
          input: {
            prompt: prompt,
          }
        }
      );
      return output as string[];
}