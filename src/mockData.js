//mock data for FormDataList
export const MockData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    phone: "+3816934213",
    formName: "E0 Nurse Aid Training Program",
    formStatus: "pending",
    totalWaitingTime: 362510000,
    actions: [
      {
        id: 4,
        action: "Approved by Reviewer 1",
        actionStartTime: "2023-05-27T09:10:00.000",
        waitingTime: 552300,
      },
      {
        id: 1,
        action: "Pending for Reviewer1 Approval",
        actionStartTime: "2023-06-02T09:10:00.000",
        waitingTime: 123001,
      },
      {
        id: 3,
        action: "Requested for a Change",
        actionStartTime: "2023-05-31T09:10:00.000",
        waitingTime: 41300,
      },
      {
        id: 2,
        action: "Pending for Reviewer2 Approval",
        actionStartTime: "2023-06-01T09:10:00.000",
        waitingTime: 1122300,
      },
    ],
  },
  {
    id: 2,
    name: "Anna Wagner",
    email: "annaW@gmail.com",
    phone: "+381502130",
    formName: "E1 Software Developer Training Program",
    formStatus: "accepted",
    totalWaitingTime: 361110000,
    actions: [
      {
        id: 1,
        action: "Pending for Reviewer1 Approval",
        actionStartTime: "2023-06-02T09:10:00.000",
        waitingTime: 12300,
      },
    ],
  },
  {
    id: 3,
    name: "Kim Yao Li",
    email: "kimkimyao@gmail.com",
    phone: "+381502130",
    formName: "E1 English",
    formStatus: "accepted",
    totalWaitingTime: 262510000,
    actions: [
      {
        id: 1,
        action: "Pending for Reviewer1 Approval",
        actionStartTime: "2023-06-02T09:10:00.000",
        waitingTime: 12300,
      },
    ],
  },
  {
    id: 4,
    name: "Aragon Chez",
    email: "chezslayer1233455@gmail.com",
    phone: "+381502130",
    formName: "E2 Roman Law",
    formStatus: "accepted",
    totalWaitingTime: 192510000,
    actions: [
      {
        id: 1,
        action: "Pending for Reviewer1 Approval",
        actionStartTime: "2023-06-02T09:10:00.000",
        waitingTime: 12300,
      },
    ],
  },
  {
    id: 5,
    name: "Yevgenya Alexeyeva",
    email: "alexyevg@gmail.com",
    phone: "+3851231123",
    formName: "E2 Roman Law",
    formStatus: "accepted",
    totalWaitingTime: 362550000,
    actions: [
      {
        id: 1,
        action: "Pending for Reviewer1 Approval",
        actionStartTime: "2023-06-02T09:10:00.000",
        waitingTime: 12300,
      },
    ],
  },
  {
    id: 6,
    name: "Jorge Jorge",
    email: "hosejorge223@gmail.com",
    phone: "+38750221130",
    formName: "OET",
    formStatus: "rejected",
    totalWaitingTime: 510000,
    actions: [
      {
        id: 1,
        action: "Pending for Reviewer1 Approval",
        actionStartTime: "2023-06-02T09:10:00.000",
        waitingTime: 12300,
      },
    ],
  },
];

//mock data for users
export const Users = [
  { username: "aleksa", password: "asdasdasdasd", email: "asd@asd.com" },
];
