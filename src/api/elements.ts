export interface Element {
  id: string
  label: string
  value: number
}

class ElementsApi {
  getElements = async (): Promise<Element[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const elements = [];
        for (let i = 1; i <= 300; i++) {
          const element = {
            id: String(i),
            label: `Element ${i}`,
            value: i,
          }
          elements.push(element)
        }
        resolve(elements)
      }, 500)
    })
  }
}

export const elementsApi = new ElementsApi()