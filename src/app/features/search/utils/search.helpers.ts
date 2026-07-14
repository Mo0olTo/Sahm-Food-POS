export function normalizeText(value: string): string {

    return value
      .toLowerCase()
      .trim();
  
  }
  
  
  export function containsText(
    source: string,
    query: string
  ): boolean {
  
    return normalizeText(source)
      .includes(normalizeText(query));
  
  }