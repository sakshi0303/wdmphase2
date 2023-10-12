import { OpenAI } from 'openai'

/**
 * openAI ensures you dont commit this in github
 * key: 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
 */
const openAI = new OpenAI({
  apiKey: 'xx',
  dangerouslyAllowBrowser: true
})

// Example usage:
// Pie Chart: A pie chart can be used to show the distribution of sentiments among the feedback. You can divide the feedback into positive, negative, and neutral categories and represent each category as a slice of the pie.
// Bar Chart: A bar chart can display the number or percentage of feedback in each sentiment category. You can have three bars corresponding to positive, negative, and neutral sentiments.
// Stacked Bar Chart: Similar to a bar chart, a stacked bar chart can show the sentiment distribution over time or by instructor. Each bar represents a group of feedback, and the segments within each bar show the proportion of positive, negative, and neutral feedback.
// Word Cloud: Create word clouds for each sentiment category. The size of each word in the word cloud corresponds to its frequency in the feedback. This can provide insights into common positive or negative keywords used by students.

export async function getSentiment(prompt: string): Promise<'Positive' | 'Negative' | 'Neutral'> {
  try {
    // Define a sentiment analysis prompt
    const sentimentAnalysisPrompt = "Please classify the sentiment expressed in the following sentence as positive, neutral, or negative. More information should be provided on the mood and tone: ";

    const response = await openAI.completions.create({
      model: "text-davinci-003",
      prompt: sentimentAnalysisPrompt + prompt + ".",
      temperature: 0,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    // Parse the sentiment from the API response
    return parseResponse(response);

  } catch (error) {
    console.error('An error occurred:', error);
    return 'Neutral';
  }
}

function parseResponse(response: any): 'Positive' | 'Negative' | 'Neutral' {
  const sentiment = JSON.stringify(response['choices'][0]['text'])
  // console.log(sentiment)

  if (sentiment.includes('Positive')) {
    return 'Positive'
  } else if (sentiment.includes('Negative')) {
    return 'Negative'
  }
  return 'Neutral'
}


// TEST CASE:

// async function main() {
//   const prompt = 'I love this product!';
//   const sentiment = await getSentiment(prompt);

//   if (sentiment !== null) {
//     console.log(`Sentiment for "${prompt}": ${sentiment}`);
//   }
// }

// main();
