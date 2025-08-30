export async function fetchQuestionsServer(params: {
  countryCode: string;
  page: number;
  limit: number;
}) {
  const baseUrl = process.env.API_URL;
  if (!baseUrl) throw new Error("Missing API_URL in env");

  const res = await fetch(`${baseUrl}/forum/questions`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`Failed to fetch questions (SSR). ${res.status}: ${body}`);
    // throw new Error(`Failed to fetch questions (SSR). ${res.status}: ${body}`);
  }

  // return res.json();
  return {
    items: [
      {
        createdDate: "2024-07-22T18:12:21.836Z",
        updateDate: "2024-07-22T18:12:21.836Z",
        status: true,
        id: 1,
        title: "sdfsdfsdfdfsdf",
        text: "sdfsdfsdfsdf",
        answers: [
          {
            id: 2,
            createdDate: "2025-08-29T16:50:45.994Z",
            updateDate: "2025-08-29T16:50:45.994Z",
            status: false,
            text: "string",
            isGreen: false,
          },
        ],
        topic: null,
        botUser: {
          firstname: "Sina",
          lastname: "Pirani",
          username: "piranidev",
          level: 0,
        },
        user: null,
        votes: [],
        country: {
          createdDate: "2023-08-10T14:50:30.932Z",
          updateDate: "2023-10-27T14:40:05.240Z",
          status: true,
          availability: true,
          id: 8,
          name: "دانمارک",
          code: "dk",
          iso2: "DK",
          iso3: "DNK",
          englishName: "Denmark",
          areaCode: 45,
          currency: null,
          currencyName: null,
        },
      },
      {
        createdDate: "2024-07-23T08:57:17.816Z",
        updateDate: "2024-07-23T08:57:20.789Z",
        status: true,
        id: 2,
        title: "یک سوال تستی",
        text: "سوال تستی",
        answers: [],
        topic: null,
        botUser: {
          firstname: "Sina",
          lastname: "Pirani",
          username: "piranidev",
          level: 0,
        },
        user: null,
        votes: [],
        country: {
          createdDate: "2023-08-10T14:50:30.932Z",
          updateDate: "2023-10-27T14:40:05.240Z",
          status: true,
          availability: true,
          id: 8,
          name: "دانمارک",
          code: "dk",
          iso2: "DK",
          iso3: "DNK",
          englishName: "Denmark",
          areaCode: 45,
          currency: null,
          currencyName: null,
        },
      },
    ],
    meta: {
      currentPage: 1,
      itemCount: 2,
      itemsPerPage: 30,
      totalItems: 2,
      totalPages: 1,
    },
  };
}
