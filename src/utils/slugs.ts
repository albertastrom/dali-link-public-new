export function generateSlug(firstName: string, year: string): string {
    return `${firstName.toLowerCase()}-${year}`;
  }
  
  /**
   * Creates a MongoDB query object for finding a member by slug
   */
  export function parseSlug(slug: string): { firstName: string; year: string } {
    const [firstName, year] = slug.split('-');
    
    return {
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      year: year 
    };
  }