export interface SiteBlueprint {
  id: string;
  name: string;
  pages: PageBlueprint[];
  theme: Theme;
}

export interface PageBlueprint {
  slug: string;
  title: string;
  sections: Section[];
}

export interface Section {
  type: 'hero' | 'features' | 'pricing' | 'gallery' | 'contact' | 'about' | 'testimonials' | 'footer';
  content: Record<string, string>;
}

export interface Theme {
  primary: string;
  secondary: string;
  font: string;
  style: 'modern' | 'minimal' | 'bold';
}
