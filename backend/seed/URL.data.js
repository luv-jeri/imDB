const URLS = {
  trending: '/trending/all/day',
  oridinals: '/discover/movie?sort_by=popularity.desc',
  rated: '/movie/top_rated',
  action: '/discover/movie?with_genres=28',
  comedy: '/discover/movie?with_genres=35',
  horror: '/discover/movie?with_genres=27',
  romance: '/discover/movie?with_genres=10749',
  documentaries: '/discover/movie?with_genres=99',
};

const RowData = [
  URLS.trending,
  URLS.oridinals,
  URLS.rated,
  URLS.action,
  URLS.comedy,
  URLS.horror,
  URLS.romance,
  URLS.documentaries,
];

module.exports = RowData;
