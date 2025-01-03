
export const durationData = [
    { "name": "5 min", "value": (5 * 60).toString() },
    { "name": "10 min", "value": (10 * 60).toString() },
    { "name": "15 min", "value": (15 * 60).toString() },
    { "name": "20 min", "value": (20 * 60).toString() },
    { "name": "25 min", "value": (25 * 60).toString() },
    { "name": "30 min", "value": (30 * 60).toString() },
    { "name": "35 min", "value": (35 * 60).toString() },
    { "name": "40 min", "value": (40 * 60).toString() },
    { "name": "45 min", "value": (45 * 60).toString() },
    { "name": "50 min", "value": (50 * 60).toString() },
    { "name": "55 min", "value": (55 * 60).toString() },
    { "name": "60 min", "value": (60 * 60).toString() },
    { "name": "1 hr 5 min", "value": (65 * 60).toString() },
    { "name": "1 hr 10 min", "value": (70 * 60).toString() },
    { "name": "1 hr 15 min", "value": (75 * 60).toString() },
    { "name": "1 hr 20 min", "value": (80 * 60).toString() },
    { "name": "1 hr 25 min", "value": (85 * 60).toString() },
    { "name": "1 hr 30 min", "value": (90 * 60).toString() },
    { "name": "1 hr 35 min", "value": (95 * 60).toString() },
    { "name": "1 hr 40 min", "value": (100 * 60).toString() },
    { "name": "1 hr 45 min", "value": (105 * 60).toString() },
    { "name": "1 hr 50 min", "value": (110 * 60).toString() },
    { "name": "1 hr 55 min", "value": (115 * 60).toString() },
    { "name": "2 hr", "value": (120 * 60).toString() },
    { "name": "2 hr 15 min", "value": (135 * 60).toString() },
    { "name": "2 hr 30 min", "value": (150 * 60).toString() },
    { "name": "2 hr 45 min", "value": (165 * 60).toString() },
    { "name": "3 hr", "value": (180 * 60).toString() },
    { "name": "3 hr 15 min", "value": (195 * 60).toString() },
    { "name": "3 hr 30 min", "value": (210 * 60).toString() },
    { "name": "3 hr 45 min", "value": (225 * 60).toString() },
    { "name": "4 hr", "value": (240 * 60).toString() },
    { "name": "4 hr 30 min", "value": (270 * 60).toString() },
    { "name": "5 hr", "value": (300 * 60).toString() },
    { "name": "5 hr 30 min", "value": (330 * 60).toString() },
    { "name": "6 hr", "value": (360 * 60).toString() },
    { "name": "6 hr 30 min", "value": (390 * 60).toString() },
    { "name": "7 hr", "value": (420 * 60).toString() },
    { "name": "8 hr", "value": (480 * 60).toString() },
    { "name": "9 hr", "value": (540 * 60).toString() },
    { "name": "10 hr", "value": (600 * 60).toString() },
    { "name": "11 hr", "value": (660 * 60).toString() },
    { "name": "12 hr", "value": (720 * 60).toString() }
];

export const generateTimeArray = () => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Set to start of the day
    const timeArray = [];
    const interval = 5 * 60 * 1000; // 5 minutes in milliseconds

    for (let i = 0; i <= 24 * 60 * 60 * 1000; i += interval) {
        const currentTime = new Date(startOfDay.getTime() + i);
        const hours = String(currentTime.getHours()).padStart(2, '0');
        const minutes = String(currentTime.getMinutes()).padStart(2, '0');

        timeArray.push({
            name: `${hours}:${minutes}`,
            value: (currentTime.getTime() - startOfDay.getTime()) / 1000
        });
    }

    return timeArray;
};

export const BrandName = "Baranie"


export const colorArray = [
    { name: "gray", value: "#6b7280" },
    { name: "red", value: "#ef4444" },
    { name: "pink", value: "#ec4899" },
    { name: "purple", value: "#8b5cf6" },
    { name: "indigo", value: "#6366f1" },
    { name: "blue", value: "#3b82f6" },
    { name: "sky", value: "#0ea5e9" },
    { name: "cyan", value: "#06b6d4" },
    { name: "teal", value: "#14b8a6" },
    { name: "green", value: "#22c55e" },
    { name: "lime", value: "#84cc16" },
    { name: "yellow", value: "#eab308" },
    { name: "amber", value: "#f59e0b" },
    { name: "orange", value: "#f97316" },
    { name: "rose", value: "#f43f5e" },
];



export const countriesArray: { name: string, value: string }[] = [
    { name: "China", value: "China" },
    { name: "Japan", value: "Japan" },
    { name: "Korea (South)", value: "Korea (South)" },
    { name: "Malaysia", value: "Malaysia" },
    { name: "Myanmar (Burma)", value: "Myanmar (Burma)" },
    { name: "Singapore", value: "Singapore" },
    { name: "Thailand", value: "Thailand" },
];

export const currencyUnits: { name: string, value: string }[] = [
    { name: "CNY (China)", value: "CNY" },       // China
    { name: "JPY (Japan)", value: "JPY" },       // Japan
    { name: "KRW (Korea, South)", value: "KRW" }, // Korea (South)
    { name: "MYR (Malaysia)", value: "MYR" },    // Malaysia
    { name: "MMK (Myanmar, Burma)", value: "MMK" }, // Myanmar (Burma)
    { name: "SGD (Singapore)", value: "SGD" },   // Singapore
    { name: "THB (Thailand)", value: "THB" },    // Thailand
    { name: "USD (United States)", value: "USD" } // United States
];

export const asianLanguages = [
    { name: "Burmese (Myanmar)", value: "Burmese (Myanmar)" },
    { name: "Chinese (Simplified)", value: "Chinese (Simplified)" },
    { name: "Chinese (Traditional)", value: "Chinese (Traditional)" },
    { name: "English", value: "English" },
    { name: "Japanese", value: "Japanese" },
    { name: "Korean", value: "Korean" },
    { name: "Thai", value: "Thai" },
];

export const anyMember: any = {
    address: undefined,
    commissionFees: 0,
    commissionFeesType: "percent",
    country: "USA",
    createdAt: "2024-11-07T13:47:29.445Z",
    dob: "1990-05-15",
    email: "anymember@gmail.com",
    experience: 0,
    firstName: "Unassigned",
    gender: "male",
    id: "-1",
    jobTitle: "Software Engineer",
    languageProficiency: ["English", "Spanish"],
    lastName: "",
    memberId: "12345",
    notes: "Experienced developer",
    phone: "+123456789",
    profilePictureUrl: "https://example.com/profile1.jpg",
    rating: 4.5,
    ratingCount: 120,
    services: [],
    role: "organization",
    startDate: "2023-01-01",
    type: "employee",
    updatedAt: "2024-11-15T14:23:13.000Z",
}

export const noMember: any = {
    address: null,
    commissionFees: 0,
    commissionFeesType: "percent",
    country: "USA",
    createdAt: "2024-11-07T13:47:29.445Z",
    deletedAt: null,
    dob: "1990-05-15",
    email: "anymember@gmail.com",
    experience: 10,
    firstName: "Unassigned",
    gender: "male",
    id: -1,
    jobTitle: "Software Engineer",
    languageProficiency: ["English", "Spanish"],
    lastName: "",
    memberId: "12345",
    notes: "Experienced developer",
    orgId: 1,
    phone: "+123456789",
    profilePictureUrl: "https://example.com/profile1.jpg",
    rating: 4.5,
    ratingCount: 120,
    role: "organization",
    startDate: "2023-01-01",
    type: "full-time",
    updatedAt: "2024-11-15T14:23:13.000Z",
}

