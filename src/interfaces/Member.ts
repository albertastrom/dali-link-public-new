export interface Member {
    name: string;
    year: string;
    dev: boolean;
    des: boolean;
    pm: boolean;
    core: boolean;
    mentor: boolean;
    major: string;
    minor?: string | null;
    birthday: string;
    home: string;
    quote: string;
    favoriteThings: string[];
    favoriteDartmouthTradition?: string | null;
    funFact?: string | null;
    picture?: string | null;
    interest1?: string | null;
    interest2?: string | null;
  }
  