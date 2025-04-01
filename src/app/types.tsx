export type MovieId = {
  movieId: number;
};

export type MovieDetail = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  cast: [
    {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
    }
  ];
  crew: [
    {
      adult: boolean;
      credit_id: string;
      department: string;
      gender: number;
      id: number;
      job: string;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string | null;
    }
  ];
  runtime: number
  genres:Genre[]
};

export type Genre = {
  id:number;
  name:string;
}
