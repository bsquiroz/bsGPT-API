import OpenAI from 'openai';

interface Opt {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  { prompt }: Opt,
) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
        Las palabras usadas deben de existir en el diccionario de la Real Academia Española,
        Debes de responder en formato JSON, 
        tu tarea es corregirlos y retornar información soluciones, 
        también debes de dar un porcentaje de acierto por el usuario,
        
        Si no hay errores, debes de retornar un mensaje de felicitaciones.

        Ejemplo de salida cuando hay errores:
        {
          userScore: number,
          errors: string[], // ['error -> solución']
          message: string, //  Usa emojis y texto para felicitar al usuario
        }

        Ejemplo de salida cuando no se encuentran errores:
        {
          userScore: number, // debe ser 100, ya que no hubieron errores
          errors: string[], // un arreglo vacio, porque no hay errores
          message: string, //  Un mensahe de felicitacion porque todo salio bien
        }
        `,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-3.5-turbo-1106',
    temperature: 0.3,
    max_tokens: 150,
    response_format: {
      type: 'json_object',
    },
  });

  const response = JSON.parse(completion.choices[0].message.content);

  return response;
};
