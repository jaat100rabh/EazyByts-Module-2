export type StockData = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  high52w: number;
  low52w: number;
  chartData: {
    time: string;
    price: number;
  }[];
  lastUpdated?: string; // New field for tracking when stock was last updated
};

export type NewsItem = {
  id: string;
  title: string;
  source: string;
  time: string;
  summary: string;
  url: string;
  relatedSymbols: string[];
};

// Mock data for Indian stocks (Nifty 50)
const mockStockData: StockData[] = [
  {
    id: "1",
    symbol: "RELIANCE",
    name: "Reliance Industries",
    price: 1456.40,
    change: 0.15,
    changePercent: 0.15,
    volume: 9036695,
    marketCap: "19.44L Cr",
    high52w: 1608.80,
    low52w: 1114.85,
    chartData: generateChartData(1456, 200, 20, true)
  },
  {
    id: "2",
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    price: 1934.70,
    change: 0.05,
    changePercent: 0.05,
    volume: 7934005,
    marketCap: "12.56L Cr",
    high52w: 1978.90,
    low52w: 1435.50,
    chartData: generateChartData(1935, 300, 20, true)
  },
  {
    id: "3",
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: 3561.30,
    change: -18.52,
    changePercent: -0.52,
    volume: 1666727,
    marketCap: "6.18L Cr",
    high52w: 4592.25,
    low52w: 3056.05,
    chartData: generateChartData(3561, 400, 20, false)
  },
  {
    id: "4",
    symbol: "BHARTIARTL",
    name: "Bharti Airtel",
    price: 1814.00,
    change: -53.20,
    changePercent: -2.85,
    volume: 10000000,
    marketCap: "9.32L Cr",
    high52w: 1917.00,
    low52w: 1219.05,
    chartData: generateChartData(1814, 300, 20, false)
  },
  {
    id: "5",
    symbol: "ICICIBANK",
    name: "ICICI Bank",
    price: 1454.00,
    change: 3.20,
    changePercent: 0.22,
    volume: 6439208,
    marketCap: "7.28L Cr",
    high52w: 1456.50,
    low52w: 1051.05,
    chartData: generateChartData(1454, 200, 20, true)
  },
  {
    id: "6",
    symbol: "SBIN",
    name: "State Bank of India",
    price: 792.10,
    change: -15.68,
    changePercent: -1.94,
    volume: 10000000,
    marketCap: "6.02L Cr",
    high52w: 912.00,
    low52w: 680.00,
    chartData: generateChartData(792, 100, 20, false)
  },
  {
    id: "7",
    symbol: "INFY",
    name: "Infosys",
    price: 1589.90,
    change: -23.04,
    changePercent: -1.43,
    volume: 4576751,
    marketCap: "2.67L Cr",
    high52w: 2006.45,
    low52w: 1307.00,
    chartData: generateChartData(1590, 200, 20, false)
  },
  {
    id: "8",
    symbol: "BAJFINANCE",
    name: "Bajaj Finance",
    price: 9167.00,
    change: -21.08,
    changePercent: -0.23,
    volume: 625192,
    marketCap: "4.08L Cr",
    high52w: 9660.00,
    low52w: 6375.70,
    chartData: generateChartData(9167, 800, 20, false)
  },
  {
    id: "9",
    symbol: "HINDUNILVR",
    name: "Hindustan Unilever",
    price: 2381.40,
    change: 26.18,
    changePercent: 1.11,
    volume: 1473000,
    marketCap: "3.48L Cr",
    high52w: 3035.00,
    low52w: 2136.00,
    chartData: generateChartData(2381, 300, 20, true)
  },
  {
    id: "10",
    symbol: "ITC",
    name: "ITC",
    price: 435.70,
    change: 3.03,
    changePercent: 0.70,
    volume: 10000000,
    marketCap: "1.94L Cr",
    high52w: 499.96,
    low52w: 381.10,
    chartData: generateChartData(436, 50, 20, true)
  },
  {
    id: "11",
    symbol: "LT",
    name: "Larsen & Toubro",
    price: 3604.70,
    change: -13.44,
    changePercent: -0.37,
    volume: 1278520,
    marketCap: "6.65L Cr",
    high52w: 3963.50,
    low52w: 2965.30,
    chartData: generateChartData(3605, 400, 20, false)
  },
  {
    id: "12",
    symbol: "HCLTECH",
    name: "HCL Technologies",
    price: 1659.90,
    change: -36.12,
    changePercent: -2.13,
    volume: 2586263,
    marketCap: "3.48L Cr",
    high52w: 2012.20,
    low52w: 1235.00,
    chartData: generateChartData(1660, 200, 20, false)
  },
  {
    id: "13",
    symbol: "KOTAKBANK",
    name: "Kotak Bank",
    price: 2108.20,
    change: 1.90,
    changePercent: 0.09,
    volume: 2057908,
    marketCap: "2.73L Cr",
    high52w: 2301.90,
    low52w: 1602.45,
    chartData: generateChartData(2108, 200, 20, true)
  },
  {
    id: "14",
    symbol: "SUNPHARMA",
    name: "Sun Pharmaceutical",
    price: 1734.90,
    change: -5.23,
    changePercent: -0.30,
    volume: 1448249,
    marketCap: "3.19L Cr",
    high52w: 1960.35,
    low52w: 1377.20,
    chartData: generateChartData(1735, 200, 20, false)
  },
  {
    id: "15",
    symbol: "MARUTI",
    name: "Maruti Suzuki",
    price: 12995.00,
    change: 42.88,
    changePercent: 0.33,
    volume: 425275,
    marketCap: "3.64L Cr",
    high52w: 13680.00,
    low52w: 10725.00,
    chartData: generateChartData(12995, 1000, 20, true)
  },
  {
    id: "16",
    symbol: "M&M",
    name: "Mahindra & Mahindra",
    price: 3135.60,
    change: -8.78,
    changePercent: -0.28,
    volume: 2269659,
    marketCap: "3.00L Cr",
    high52w: 3270.95,
    low52w: 2286.20,
    chartData: generateChartData(3136, 300, 20, false)
  },
  {
    id: "17",
    symbol: "AXISBANK",
    name: "Axis Bank",
    price: 1208.80,
    change: -0.24,
    changePercent: -0.02,
    volume: 4016269,
    marketCap: "6.43L Cr",
    high52w: 1339.65,
    low52w: 933.50,
    chartData: generateChartData(1209, 150, 20, false)
  },
  {
    id: "18",
    symbol: "ULTRACEMCO",
    name: "UltraTech Cement",
    price: 11905.00,
    change: 10.71,
    changePercent: 0.09,
    volume: 209706,
    marketCap: "2.89L Cr",
    high52w: 12339.00,
    low52w: 9525.50,
    chartData: generateChartData(11905, 900, 20, true)
  },
  {
    id: "19",
    symbol: "NTPC",
    name: "NTPC",
    price: 343.10,
    change: 1.17,
    changePercent: 0.34,
    volume: 6920351,
    marketCap: "2.55L Cr",
    high52w: 448.45,
    low52w: 292.80,
    chartData: generateChartData(343, 50, 20, true)
  },
  {
    id: "20",
    symbol: "BAJAJFINSV",
    name: "Bajaj Finserv",
    price: 2033.60,
    change: -8.40,
    changePercent: -0.41,
    volume: 1568556,
    marketCap: "4.59L Cr",
    high52w: 2135.00,
    low52w: 1419.05,
    chartData: generateChartData(2034, 200, 20, false)
  },
  {
    id: "21",
    symbol: "TITAN",
    name: "Titan",
    price: 3633.70,
    change: -3.27,
    changePercent: -0.09,
    volume: 525064,
    marketCap: "2.84L Cr",
    high52w: 3867.00,
    low52w: 2925.00,
    chartData: generateChartData(3634, 300, 20, false)
  },
  {
    id: "22",
    symbol: "ONGC",
    name: "Oil & Natural Gas Corporation",
    price: 247.27,
    change: -0.35,
    changePercent: -0.14,
    volume: 8030229,
    marketCap: "2.94L Cr",
    high52w: 345.00,
    low52w: 205.00,
    chartData: generateChartData(247, 40, 20, false)
  },
  {
    id: "23",
    symbol: "ADANIPORTS",
    name: "Adani Ports & SEZ",
    price: 1407.40,
    change: 1.26,
    changePercent: 0.09,
    volume: 2777119,
    marketCap: "2.62L Cr",
    high52w: 1621.40,
    low52w: 995.65,
    chartData: generateChartData(1407, 200, 20, true)
  },
  {
    id: "24",
    symbol: "ADANIENT",
    name: "Adani Enterprises",
    price: 2555.00,
    change: 34.92,
    changePercent: 1.39,
    volume: 1641135,
    marketCap: "2.40L Cr",
    high52w: 3743.90,
    low52w: 2025.00,
    chartData: generateChartData(2555, 300, 20, true)
  },
  {
    id: "25",
    symbol: "POWERGRID",
    name: "Power Grid Corporation of India",
    price: 300.20,
    change: 0.54,
    changePercent: 0.18,
    volume: 10000000,
    marketCap: "1.36L Cr",
    high52w: 366.25,
    low52w: 247.30,
    chartData: generateChartData(300, 40, 20, true)
  },
  {
    id: "26",
    symbol: "TATAMOTORS",
    name: "Tata Motors",
    price: 730.70,
    change: 2.63,
    changePercent: 0.36,
    volume: 10000000,
    marketCap: "3.19L Cr",
    high52w: 1179.00,
    low52w: 535.75,
    chartData: generateChartData(731, 100, 20, true)
  },
  {
    id: "27",
    symbol: "WIPRO",
    name: "Wipro",
    price: 254.31,
    change: -2.26,
    changePercent: -0.88,
    volume: 6640387,
    marketCap: "2.67L Cr",
    high52w: 324.60,
    low52w: 208.50,
    chartData: generateChartData(254, 40, 20, false)
  },
  {
    id: "28",
    symbol: "BEL",
    name: "Bharat Electronics",
    price: 363.90,
    change: 13.50,
    changePercent: 3.85,
    volume: 10000000,
    marketCap: "3.48L Cr",
    high52w: 351.00,
    low52w: 227.50,
    chartData: generateChartData(364, 50, 20, true)
  },
  {
    id: "29",
    symbol: "JSWSTEEL",
    name: "JSW Steel",
    price: 1021.80,
    change: -16.53,
    changePercent: -1.59,
    volume: 1048380,
    marketCap: "2.73L Cr",
    high52w: 1074.90,
    low52w: 823.80,
    chartData: generateChartData(1022, 100, 20, false)
  },
  {
    id: "30",
    symbol: "COALINDIA",
    name: "Coal India",
    price: 404.80,
    change: 0.16,
    changePercent: 0.04,
    volume: 4702603,
    marketCap: "3.19L Cr",
    high52w: 543.55,
    low52w: 349.25,
    chartData: generateChartData(405, 60, 20, true)
  },
  {
    id: "31",
    symbol: "EICHERMOT",
    name: "Eicher Motors",
    price: 5509.50,
    change: 43.67,
    changePercent: 0.80,
    volume: 638327,
    marketCap: "3.64L Cr",
    high52w: 5906.50,
    low52w: 4253.85,
    chartData: generateChartData(5510, 500, 20, true)
  },
  {
    id: "32",
    symbol: "HINDALCO",
    name: "Hindalco Industries",
    price: 657.55,
    change: -3.77,
    changePercent: -0.57,
    volume: 2701320,
    marketCap: "3.00L Cr",
    high52w: 772.65,
    low52w: 546.45,
    chartData: generateChartData(658, 80, 20, false)
  },
  {
    id: "33",
    symbol: "SHRIRAMFIN",
    name: "Shriram Finance",
    price: 665.50,
    change: -9.29,
    changePercent: -1.38,
    volume: 5415727,
    marketCap: "6.43L Cr",
    high52w: 2732.15,
    low52w: 438.60,
    chartData: generateChartData(666, 80, 20, false)
  },
  {
    id: "34",
    symbol: "CIPLA",
    name: "Cipla",
    price: 1499.90,
    change: -2.25,
    changePercent: -0.15,
    volume: 1660861,
    marketCap: "2.89L Cr",
    high52w: 1702.05,
    low52w: 1335.00,
    chartData: generateChartData(1500, 150, 20, false)
  },
  {
    id: "35",
    symbol: "TATACONSUM",
    name: "Tata Consumer Products",
    price: 1168.00,
    change: 20.80,
    changePercent: 1.81,
    volume: 1336653,
    marketCap: "2.55L Cr",
    high52w: 1247.10,
    low52w: 882.90,
    chartData: generateChartData(1168, 120, 20, true)
  },
  {
    id: "36",
    symbol: "DRREDDY",
    name: "Dr Reddys Laboratories",
    price: 1230.70,
    change: -5.54,
    changePercent: -0.45,
    volume: 882873,
    marketCap: "4.59L Cr",
    high52w: 1421.49,
    low52w: 1020.00,
    chartData: generateChartData(1231, 140, 20, false)
  },
  {
    id: "37",
    symbol: "APOLLOHOSP",
    name: "Apollo Hospitals",
    price: 7015.00,
    change: -57.12,
    changePercent: -0.81,
    volume: 270773,
    marketCap: "2.84L Cr",
    high52w: 7545.35,
    low52w: 5693.20,
    chartData: generateChartData(7015, 700, 20, false)
  },
  {
    id: "38",
    symbol: "HEROMOTOCO",
    name: "Hero Motocorp",
    price: 4345.30,
    change: 20.22,
    changePercent: 0.47,
    volume: 765257,
    marketCap: "86910.70",
    high52w: 6246.25,
    low52w: 3344.00,
    chartData: generateChartData(4345, 400, 20, true)
  },
  {
    id: "39",
    symbol: "INDUSINDBK",
    name: "Indusind Bank",
    price: 780.20,
    change: -0.31,
    changePercent: -0.04,
    volume: 10000000,
    marketCap: "60781.80",
    high52w: 1550.00,
    low52w: 606.00,
    chartData: generateChartData(780, 100, 20, false)
  },
  {
    id: "40",
    symbol: "ASIANPAINT",
    name: "Asian Paints",
    price: 2353.60,
    change: 23.77,
    changePercent: 1.02,
    volume: 785113,
    marketCap: "2.40L Cr",
    high52w: 3394.90,
    low52w: 2124.75,
    chartData: generateChartData(2354, 300, 20, true)
  },
  {
    id: "41",
    symbol: "TRENT",
    name: "Trent",
    price: 5583.00,
    change: 5.58,
    changePercent: 0.10,
    volume: 808195,
    marketCap: "1.36L Cr",
    high52w: 8345.00,
    low52w: 4196.00,
    chartData: generateChartData(5583, 600, 20, true)
  },
  {
    id: "42",
    symbol: "TATASTEEL",
    name: "Tata Steel",
    price: 157.55,
    change: 0.20,
    changePercent: 0.13,
    volume: 10000000,
    marketCap: "3.19L Cr",
    high52w: 184.60,
    low52w: 122.62,
    chartData: generateChartData(158, 20, 20, true)
  },
  {
    id: "43",
    symbol: "GRASIM",
    name: "Grasim Industries",
    price: 2804.20,
    change: -20.68,
    changePercent: -0.73,
    volume: 700214,
    marketCap: "2.67L Cr",
    high52w: 2877.75,
    low52w: 2171.60,
    chartData: generateChartData(2804, 300, 20, false)
  },
  {
    id: "44",
    symbol: "SBILIFE",
    name: "SBI Life Insurance",
    price: 1773.40,
    change: -11.26,
    changePercent: -0.63,
    volume: 696146,
    marketCap: "3.48L Cr",
    high52w: 1936.00,
    low52w: 1307.70,
    chartData: generateChartData(1773, 200, 20, false)
  },
  {
    id: "45",
    symbol: "JIOFIN",
    name: "Jio Financial Services",
    price: 277.00,
    change: 3.31,
    changePercent: 1.21,
    volume: 10000000,
    marketCap: "2.73L Cr",
    high52w: 376.00,
    low52w: 198.65,
    chartData: generateChartData(277, 50, 20, true)
  },
  {
    id: "46",
    symbol: "HDFCLIFE",
    name: "HDFC Life Insurance",
    price: 750.55,
    change: -0.68,
    changePercent: -0.09,
    volume: 1426234,
    marketCap: "3.19L Cr",
    high52w: 761.20,
    low52w: 511.40,
    chartData: generateChartData(751, 100, 20, false)
  },
  {
    id: "47",
    symbol: "TECHM",
    name: "Tech Mahindra",
    price: 1617.00,
    change: -12.07,
    changePercent: -0.74,
    volume: 1159095,
    marketCap: "3.64L Cr",
    high52w: 1807.70,
    low52w: 1193.65,
    chartData: generateChartData(1617, 200, 20, false)
  },
  {
    id: "48",
    symbol: "BAJAJ-AUTO",
    name: "Bajaj Auto",
    price: 8482.50,
    change: 156.25,
    changePercent: 1.88,
    volume: 483122,
    marketCap: "3.00L Cr",
    high52w: 12774.00,
    low52w: 7089.35,
    chartData: generateChartData(8483, 800, 20, true)
  },
  {
    id: "49",
    symbol: "NESTLEIND",
    name: "Nestle",
    price: 2408.80,
    change: 10.80,
    changePercent: 0.45,
    volume: 684551,
    marketCap: "6.43L Cr",
    high52w: 2778.00,
    low52w: 2110.00,
    chartData: generateChartData(2409, 300, 20, true)
  },
  {
    id: "50",
    symbol: "ETERNAL",
    name: "Eternal",
    price: 245.76,
    change: 3.17,
    changePercent: 1.31,
    volume: 10000000,
    marketCap: "2.89L Cr",
    high52w: 304.70,
    low52w: 146.30,
    chartData: generateChartData(246, 40, 20, true)
  }
];

const mockNewsData: NewsItem[] = [
  {
    id: "1",
    title: "Reliance to acquire stake in renewable energy startup for ₹1,200 crore",
    source: "Economic Times",
    time: "Today",
    summary: "Reliance Industries is set to acquire a significant stake in a renewable energy startup, furthering its green energy ambitions with a ₹1,200 crore investment.",
    url: "#",
    relatedSymbols: ["RELIANCE"]
  },
  {
    id: "2",
    title: "TCS wins $200 million deal with Australian financial services firm",
    source: "Business Standard",
    time: "Yesterday",
    summary: "Tata Consultancy Services has secured a $200 million multi-year contract to provide digital transformation services to a leading Australian financial services company.",
    url: "#",
    relatedSymbols: ["TCS"]
  },
  {
    id: "3",
    title: "Infosys partners with global AI firm to enhance service offerings",
    source: "Mint",
    time: "Today",
    summary: "Infosys has announced a strategic partnership with a leading global AI firm to enhance its service offerings and deliver advanced AI solutions to clients across sectors.",
    url: "#",
    relatedSymbols: ["INFY"]
  },
  {
    id: "4",
    title: "HDFC Bank expands rural presence with 500 new branches",
    source: "Financial Express",
    time: "Today",
    summary: "HDFC Bank has announced plans to open 500 new branches in rural India over the next year, significantly expanding its presence in underbanked areas.",
    url: "#",
    relatedSymbols: ["HDFCBANK"]
  },
  {
    id: "5",
    title: "ICICI Bank launches innovative digital banking solution for MSMEs",
    source: "Business Today",
    time: "Yesterday",
    summary: "ICICI Bank has introduced a new comprehensive digital banking solution specifically designed for micro, small and medium enterprises (MSMEs) to streamline their financial operations.",
    url: "#",
    relatedSymbols: ["ICICIBANK"]
  },
  {
    id: "6",
    title: "Market outlook: Analysts predict steady growth for FMCG sector",
    source: "CNBC-TV18",
    time: "Today",
    summary: "Leading market analysts have issued positive outlooks for the FMCG sector, with companies like Hindustan Unilever expected to benefit from improving rural demand and easing input costs.",
    url: "#",
    relatedSymbols: ["HINDUNILVR"]
  },
  {
    id: "7",
    title: "Bharti Airtel announces 5G expansion to cover all major cities",
    source: "ET Telecom",
    time: "Today",
    summary: "Bharti Airtel has accelerated its 5G rollout plan, with the aim to cover all major Indian cities by the end of this quarter, significantly ahead of the original timeline.",
    url: "#",
    relatedSymbols: ["BHARTIARTL"]
  },
  {
    id: "8",
    title: "Asian Paints reports 15% growth in quarterly profit",
    source: "Moneycontrol",
    time: "Yesterday",
    summary: "Asian Paints has reported a 15% year-on-year increase in net profit for the latest quarter, driven by strong volume growth in the decorative paints segment despite raw material price pressures.",
    url: "#",
    relatedSymbols: ["ASIANPAINT"]
  },
  {
    id: "9",
    title: "L&T secures major infrastructure contracts worth ₹8,000 crore",
    source: "Business Line",
    time: "Today",
    summary: "Larsen & Toubro has secured multiple infrastructure contracts worth approximately ₹8,000 crore across various segments including transportation, water treatment, and power transmission.",
    url: "#",
    relatedSymbols: ["LT"]
  },
  {
    id: "10",
    title: "NTPC targets 60 GW renewable energy capacity by 2032",
    source: "Economic Times",
    time: "Yesterday",
    summary: "NTPC has revised its renewable energy target upward, now aiming to achieve 60 GW capacity by 2032, as part of its strategic shift towards green energy and reducing carbon footprint.",
    url: "#",
    relatedSymbols: ["NTPC"]
  }
];

// Function to generate random chart data
function generateChartData(basePrice: number, variance: number, points: number, trending: boolean) {
  const data = [];
  let price = basePrice;
  
  for (let i = 0; i < points; i++) {
    // Generate a random price movement, slightly biased by the trending direction
    let change = (Math.random() - (trending ? 0.45 : 0.55)) * variance / points;
    price += change;
    
    // Format the time as HH:MM
    const hour = Math.floor(9 + (i / points) * 6); // Market hours 9 AM to 3 PM
    const minute = Math.floor(Math.random() * 60);
    const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    
    data.push({ time: timeStr, price: parseFloat(price.toFixed(2)) });
  }
  
  return data;
}

export const fetchStocks = async (): Promise<StockData[]> => {
  // In a real application, this would fetch from an API
  // For now, we'll return mock data after a small delay to simulate network request
  return new Promise((resolve) => {
    setTimeout(() => {
      // Add lastUpdated field to all stocks
      const stocksWithTimestamp = mockStockData.map(stock => ({
        ...stock,
        lastUpdated: new Date().toISOString()
      }));
      resolve(stocksWithTimestamp);
    }, 500);
  });
};

export const fetchNews = async (): Promise<NewsItem[]> => {
  // In a real application, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockNewsData), 700);
  });
};

export const searchStocks = async (query: string): Promise<StockData[]> => {
  // Basic search implementation for demo
  const results = mockStockData.filter(stock => 
    stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
    stock.name.toLowerCase().includes(query.toLowerCase())
  );
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(results), 300);
  });
};
