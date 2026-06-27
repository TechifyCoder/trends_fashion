import { GoogleGenerativeAI } from "@google/generative-ai"
import { type TryOnParams } from "@/types/tryon"

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? ""
)

export async function generateTryOn(params: TryOnParams): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

  const modelLabels: Record<string, string> = {
    "woman-young": "a young woman (20-30 years old)",
    "woman-middle": "a middle-aged woman (35-45 years old)",
    "woman-elderly": "an elderly woman (55+ years old)",
    "man-young": "a young man (20-30 years old)",
    "man-middle": "a middle-aged man (35-45 years old)",
    "man-elderly": "an elderly man (55+ years old)",
    "girl-child": "a young girl (8-12 years old)",
    "boy-child": "a young boy (8-12 years old)",
  }

  const prompt = `
You are a premium Indian fashion stylist working at Trends Boutique, Rajwada Indore.

Product Details:
- Name: ${params.productName}
- Fabric: ${params.fabric}
- Color: ${params.color}
- Pattern: ${params.pattern}
- Price: ₹${params.price.toLocaleString("en-IN")}

The customer wants to know how this outfit will look on: ${modelLabels[params.modelType]}.
${params.customDescription ? `Customer's special request: "${params.customDescription}"` : ""}

Please provide a detailed and helpful fashion consultation with these sections:

## ✨ Visual Description
Describe vividly how this ${params.productName} will look when worn by ${modelLabels[params.modelType]}. Describe the drape, fit, how the fabric falls, the overall silhouette, and what makes it special. Be specific about how the ${params.color} color and ${params.pattern} pattern complement the wearer.

## 💡 Styling Tips
Give exactly 3 personalized styling tips for this specific person type. How should they wear it? What styling choices will enhance their look?

## 🌸 Perfect Occasions
List the best 3 occasions to wear this outfit and why it works for each.

## 💎 Accessories to Pair
Recommend specific jewelry, footwear, handbag, and hair style that will complete this look. Be specific (e.g., "antique gold jhumkas" not just "earrings").

## 🧵 Care Instructions
Give 3 specific tips to maintain this ${params.fabric} garment so it stays beautiful for years.

Write in a warm, encouraging, conversational tone. Mix English with some Hindi words naturally (like "bilkul perfect", "bahut sundar", "ekdum beautiful"). Make the customer feel excited and confident about this outfit!
`

  try {
    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error("[Gemini] Error generating try-on:", error)
    throw new Error("AI styling consultation unavailable. Please try again.")
  }
}
