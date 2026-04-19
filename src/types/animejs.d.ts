declare module "animejs" {
  type AnimeParams = {
    targets?: unknown;
    [key: string]: unknown;
  };

  type AnimeTimeline = {
    add: (params: AnimeParams) => AnimeTimeline;
  };

  type AnimeStagger = (
    value: number,
  ) => (element: Element, index: number) => number;

  interface AnimeStatic {
    (params: AnimeParams): unknown;
    timeline: (params?: AnimeParams) => AnimeTimeline;
    stagger: AnimeStagger;
  }

  const anime: AnimeStatic;

  export default anime;
}
