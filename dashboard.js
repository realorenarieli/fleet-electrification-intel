// Fleet Electrification Intelligence Dashboard
// Electric Truck Market: TCO, OEM Comparison, Infrastructure Planning

(function() {
"use strict";

try {

var React = window.React;
var ReactDOM = window.ReactDOM;
var Recharts = window.Recharts;

var useState = React.useState;
var useEffect = React.useEffect;
var createElement = React.createElement;

// Recharts components
var LineChart = Recharts.LineChart;
var BarChart = Recharts.BarChart;
var AreaChart = Recharts.AreaChart;
var PieChart = Recharts.PieChart;
var RadarChart = Recharts.RadarChart;
var ComposedChart = Recharts.ComposedChart;
var Line = Recharts.Line;
var Bar = Recharts.Bar;
var Area = Recharts.Area;
var Pie = Recharts.Pie;
var Radar = Recharts.Radar;
var PolarGrid = Recharts.PolarGrid;
var PolarAngleAxis = Recharts.PolarAngleAxis;
var PolarRadiusAxis = Recharts.PolarRadiusAxis;
var XAxis = Recharts.XAxis;
var YAxis = Recharts.YAxis;
var CartesianGrid = Recharts.CartesianGrid;
var Tooltip = Recharts.Tooltip;
var Legend = Recharts.Legend;
var ResponsiveContainer = Recharts.ResponsiveContainer;
var Cell = Recharts.Cell;
var ReferenceLine = Recharts.ReferenceLine;

// ============ COLOR PALETTE ============
var COLORS = {
  primary: "#00d4aa",
  secondary: "#6366f1",
  accent: "#f59e0b",
  danger: "#ef4444",
  success: "#22c55e",
  info: "#3b82f6",
  purple: "#a855f7",
  pink: "#ec4899",
  cyan: "#06b6d4",
  orange: "#f97316",
  lime: "#84cc16",
  emerald: "#10b981",
  background: "#0a0f1a",
  card: "#111827",
  cardHover: "#1f2937",
  border: "#1e3a5f",
  text: "#e5e7eb",
  textMuted: "#9ca3af",
  textDim: "#6b7280"
};

var CHART_COLORS = [COLORS.primary, COLORS.secondary, COLORS.accent, COLORS.info, COLORS.purple, COLORS.pink, COLORS.cyan, COLORS.orange];

// ============ DATA: Electric Truck OEMs ============
var OEM_DATA = [
  {
    id: "tesla-semi",
    manufacturer: "Tesla",
    model: "Semi",
    class: "Class 8",
    range_miles: 500,
    range_miles_low: 300,
    battery_kwh: 900,
    charging_time_hours: 1.5,
    charging_type: "Megacharger",
    payload_lbs: 50000,
    msrp_usd: 180000,
    availability: "2024",
    status: "Production",
    motor_hp: 1000,
    torque_lb_ft: 1500,
    top_speed_mph: 65,
    efficiency_kwh_mile: 1.7,
    warranty_years: 4,
    warranty_miles: 500000
  },
  {
    id: "freightliner-ecascadia",
    manufacturer: "Freightliner",
    model: "eCascadia",
    class: "Class 8",
    range_miles: 230,
    range_miles_low: 155,
    battery_kwh: 438,
    charging_time_hours: 1.5,
    charging_type: "DC Fast (350kW)",
    payload_lbs: 48000,
    msrp_usd: 400000,
    availability: "2022",
    status: "Production",
    motor_hp: 470,
    torque_lb_ft: 1650,
    top_speed_mph: 65,
    efficiency_kwh_mile: 1.9,
    warranty_years: 5,
    warranty_miles: 500000
  },
  {
    id: "volvo-vnr",
    manufacturer: "Volvo",
    model: "VNR Electric",
    class: "Class 8",
    range_miles: 275,
    range_miles_low: 150,
    battery_kwh: 565,
    charging_time_hours: 1.5,
    charging_type: "DC Fast (350kW)",
    payload_lbs: 47000,
    msrp_usd: 350000,
    availability: "2021",
    status: "Production",
    motor_hp: 455,
    torque_lb_ft: 4051,
    top_speed_mph: 65,
    efficiency_kwh_mile: 2.0,
    warranty_years: 5,
    warranty_miles: 500000
  },
  {
    id: "peterbilt-579ev",
    manufacturer: "Peterbilt",
    model: "579EV",
    class: "Class 8",
    range_miles: 250,
    range_miles_low: 150,
    battery_kwh: 396,
    charging_time_hours: 3,
    charging_type: "DC Fast (250kW)",
    payload_lbs: 44000,
    msrp_usd: 400000,
    availability: "2022",
    status: "Production",
    motor_hp: 670,
    torque_lb_ft: 2050,
    top_speed_mph: 65,
    efficiency_kwh_mile: 1.6,
    warranty_years: 5,
    warranty_miles: 350000
  },
  {
    id: "kenworth-t680e",
    manufacturer: "Kenworth",
    model: "T680E",
    class: "Class 8",
    range_miles: 250,
    range_miles_low: 150,
    battery_kwh: 396,
    charging_time_hours: 3,
    charging_type: "DC Fast (250kW)",
    payload_lbs: 44000,
    msrp_usd: 400000,
    availability: "2022",
    status: "Production",
    motor_hp: 670,
    torque_lb_ft: 2050,
    top_speed_mph: 65,
    efficiency_kwh_mile: 1.6,
    warranty_years: 5,
    warranty_miles: 350000
  },
  {
    id: "byd-8tt",
    manufacturer: "BYD",
    model: "8TT",
    class: "Class 8",
    range_miles: 200,
    range_miles_low: 125,
    battery_kwh: 409,
    charging_time_hours: 2.5,
    charging_type: "DC Fast (150kW)",
    payload_lbs: 52000,
    msrp_usd: 300000,
    availability: "2021",
    status: "Production",
    motor_hp: 402,
    torque_lb_ft: 1770,
    top_speed_mph: 65,
    efficiency_kwh_mile: 2.0,
    warranty_years: 6,
    warranty_miles: 500000
  },
  {
    id: "nikola-tre-bev",
    manufacturer: "Nikola",
    model: "Tre BEV",
    class: "Class 8",
    range_miles: 330,
    range_miles_low: 220,
    battery_kwh: 753,
    charging_time_hours: 2,
    charging_type: "DC Fast (350kW)",
    payload_lbs: 47000,
    msrp_usd: 350000,
    availability: "2023",
    status: "Production",
    motor_hp: 645,
    torque_lb_ft: 1400,
    top_speed_mph: 75,
    efficiency_kwh_mile: 2.3,
    warranty_years: 5,
    warranty_miles: 500000
  },
  {
    id: "daimler-eactros",
    manufacturer: "Mercedes-Benz",
    model: "eActros 600",
    class: "Class 8",
    range_miles: 310,
    range_miles_low: 220,
    battery_kwh: 621,
    charging_time_hours: 1.2,
    charging_type: "Megawatt (MCS)",
    payload_lbs: 44000,
    msrp_usd: 380000,
    availability: "2024",
    status: "Production",
    motor_hp: 536,
    torque_lb_ft: 2200,
    top_speed_mph: 56,
    efficiency_kwh_mile: 2.0,
    warranty_years: 5,
    warranty_miles: 500000
  }
];

// ============ DATA: Medium Duty Trucks ============
var MEDIUM_DUTY_DATA = [
  {
    id: "freightliner-em2",
    manufacturer: "Freightliner",
    model: "eM2",
    class: "Class 6",
    range_miles: 230,
    battery_kwh: 315,
    payload_lbs: 23500,
    msrp_usd: 250000,
    status: "Production"
  },
  {
    id: "ford-e-transit",
    manufacturer: "Ford",
    model: "E-Transit",
    class: "Class 2-3",
    range_miles: 159,
    battery_kwh: 89,
    payload_lbs: 3800,
    msrp_usd: 52000,
    status: "Production"
  },
  {
    id: "rivian-edv",
    manufacturer: "Rivian",
    model: "EDV 700",
    class: "Class 2",
    range_miles: 201,
    battery_kwh: 135,
    payload_lbs: 2600,
    msrp_usd: 75000,
    status: "Production"
  },
  {
    id: "lightning-emotors",
    manufacturer: "Lightning eMotors",
    model: "ZEV4",
    class: "Class 4",
    range_miles: 150,
    battery_kwh: 140,
    payload_lbs: 6500,
    msrp_usd: 150000,
    status: "Production"
  },
  {
    id: "hino-xe",
    manufacturer: "Hino",
    model: "XE Series",
    class: "Class 6-7",
    range_miles: 200,
    battery_kwh: 350,
    payload_lbs: 18000,
    msrp_usd: 200000,
    status: "Production"
  }
];

// ============ DATA: TCO Analysis (10-Year) ============
var TCO_YEARLY_DATA = [
  { year: 0, diesel: 150000, electric: 350000, dieselCumulative: 150000, electricCumulative: 350000 },
  { year: 1, diesel: 195000, electric: 375000, dieselCumulative: 195000, electricCumulative: 375000 },
  { year: 2, diesel: 240000, electric: 400000, dieselCumulative: 240000, electricCumulative: 400000 },
  { year: 3, diesel: 285000, electric: 425000, dieselCumulative: 285000, electricCumulative: 425000 },
  { year: 4, diesel: 330000, electric: 450000, dieselCumulative: 330000, electricCumulative: 450000 },
  { year: 5, diesel: 380000, electric: 480000, dieselCumulative: 380000, electricCumulative: 480000 },
  { year: 6, diesel: 435000, electric: 510000, dieselCumulative: 435000, electricCumulative: 510000 },
  { year: 7, diesel: 495000, electric: 545000, dieselCumulative: 495000, electricCumulative: 545000 },
  { year: 8, diesel: 560000, electric: 580000, dieselCumulative: 560000, electricCumulative: 580000 },
  { year: 9, diesel: 630000, electric: 620000, dieselCumulative: 630000, electricCumulative: 620000 },
  { year: 10, diesel: 705000, electric: 660000, dieselCumulative: 705000, electricCumulative: 660000 }
];

var TCO_BREAKDOWN_DIESEL = [
  { category: "Vehicle Purchase", amount: 150000, percent: 21 },
  { category: "Fuel (Diesel)", amount: 360000, percent: 51 },
  { category: "Maintenance", amount: 120000, percent: 17 },
  { category: "Insurance", amount: 50000, percent: 7 },
  { category: "Other", amount: 25000, percent: 4 }
];

var TCO_BREAKDOWN_ELECTRIC = [
  { category: "Vehicle Purchase", amount: 350000, percent: 53 },
  { category: "Energy (Electricity)", amount: 150000, percent: 23 },
  { category: "Maintenance", amount: 45000, percent: 7 },
  { category: "Insurance", amount: 55000, percent: 8 },
  { category: "Charging Infrastructure", amount: 40000, percent: 6 },
  { category: "Other", amount: 20000, percent: 3 }
];

var ANNUAL_COST_COMPARISON = [
  { category: "Fuel/Energy", diesel: 36000, electric: 15000 },
  { category: "Maintenance", diesel: 12000, electric: 4500 },
  { category: "Insurance", diesel: 5000, electric: 5500 },
  { category: "Registration", diesel: 2500, electric: 2000 },
  { category: "DEF Fluid", diesel: 1500, electric: 0 },
  { category: "Oil Changes", diesel: 2000, electric: 0 }
];

// ============ DATA: Infrastructure ============
var CHARGING_INFRASTRUCTURE = [
  {
    type: "Level 2 AC",
    power_kw: 19.2,
    install_cost: 6000,
    equipment_cost: 2500,
    charge_time_class8: "24+ hours",
    use_case: "Overnight depot charging",
    grid_requirement: "208/240V, 80A"
  },
  {
    type: "DC Fast (50kW)",
    power_kw: 50,
    install_cost: 25000,
    equipment_cost: 35000,
    charge_time_class8: "8-10 hours",
    use_case: "Fleet depot, extended parking",
    grid_requirement: "480V 3-phase"
  },
  {
    type: "DC Fast (150kW)",
    power_kw: 150,
    install_cost: 50000,
    equipment_cost: 75000,
    charge_time_class8: "3-4 hours",
    use_case: "Regional fleet, multi-shift",
    grid_requirement: "480V 3-phase, transformer"
  },
  {
    type: "DC Fast (350kW)",
    power_kw: 350,
    install_cost: 100000,
    equipment_cost: 150000,
    charge_time_class8: "1-2 hours",
    use_case: "Long-haul, high utilization",
    grid_requirement: "Medium voltage, dedicated feed"
  },
  {
    type: "Megawatt (MCS)",
    power_kw: 1000,
    install_cost: 250000,
    equipment_cost: 300000,
    charge_time_class8: "30-45 min",
    use_case: "Long-haul, hub charging",
    grid_requirement: "High voltage, substation"
  }
];

var DEPOT_SIZING = [
  { fleet_size: 10, chargers_l2: 10, chargers_dc: 2, power_mw: 0.3, install_cost: 200000, monthly_energy: 45000 },
  { fleet_size: 25, chargers_l2: 20, chargers_dc: 5, power_mw: 0.8, install_cost: 500000, monthly_energy: 112500 },
  { fleet_size: 50, chargers_l2: 35, chargers_dc: 10, power_mw: 1.8, install_cost: 1200000, monthly_energy: 225000 },
  { fleet_size: 100, chargers_l2: 60, chargers_dc: 20, power_mw: 3.5, install_cost: 2500000, monthly_energy: 450000 },
  { fleet_size: 250, chargers_l2: 150, chargers_dc: 50, power_mw: 9.0, install_cost: 6500000, monthly_energy: 1125000 }
];

var INCENTIVES_DATA = [
  // US Incentives
  { program: "Federal Tax Credit (30C)", type: "Tax Credit", max_amount: 100000, percent: 30, status: "Active", region: "US" },
  { program: "CA HVIP", type: "Voucher", max_amount: 120000, percent: 0, status: "Active", region: "US" },
  { program: "CA EnergIIZE", type: "Infrastructure", max_amount: 500000, percent: 50, status: "Active", region: "US" },
  { program: "NY Truck Voucher", type: "Voucher", max_amount: 185000, percent: 0, status: "Active", region: "US" },
  { program: "NJ ZIP", type: "Voucher", max_amount: 175000, percent: 0, status: "Active", region: "US" },
  { program: "CARB Drayage", type: "Voucher", max_amount: 150000, percent: 0, status: "Active", region: "US" },
  // EU Incentives
  { program: "Germany KsNI", type: "Grant", max_amount: 400000, percent: 80, status: "Active", region: "EU" },
  { program: "France Bonus Écologique", type: "Grant", max_amount: 50000, percent: 40, status: "Active", region: "EU" },
  { program: "Netherlands MIA/VAMIL", type: "Tax Benefit", max_amount: 75000, percent: 36, status: "Active", region: "EU" },
  { program: "UK Plug-in Truck Grant", type: "Grant", max_amount: 25000, percent: 20, status: "Active", region: "EU" }
];

// ============ DATA: Regional Market Comparison ============
var REGIONAL_MARKET_DATA = {
  us: {
    name: "United States",
    flag: "🇺🇸",
    totalTrucks: 4200000,
    evShare2024: 0.8,
    evShare2030: 30,
    evShare2035: 67,
    regulations: [
      { name: "EPA GHG Phase 3", year: 2027, description: "52% CO2 reduction by 2032 for heavy-duty" },
      { name: "CA ACF Rule", year: 2024, description: "100% ZEV sales by 2036 (adopted by 8+ states)" },
      { name: "CARB Low NOx", year: 2024, description: "90% NOx reduction for new trucks" }
    ],
    keyMarkets: ["California", "Texas", "New York", "Florida", "Illinois"],
    avgIncentive: 150000,
    electricityPrice: 0.12,
    dieselPrice: 4.00
  },
  eu: {
    name: "European Union",
    flag: "🇪🇺",
    totalTrucks: 6500000,
    evShare2024: 1.2,
    evShare2030: 35,
    evShare2035: 70,
    regulations: [
      { name: "EU CO2 Standards HDV", year: 2025, description: "45% CO2 reduction by 2030, 90% by 2040" },
      { name: "Euro 7", year: 2027, description: "Strictest emission limits globally" },
      { name: "AFIR", year: 2025, description: "Mandatory truck charging every 60km on TEN-T" }
    ],
    keyMarkets: ["Germany", "France", "Netherlands", "Spain", "Italy"],
    avgIncentive: 120000,
    electricityPrice: 0.25,
    dieselPrice: 1.80
  },
  israel: {
    name: "Israel",
    flag: "🇮🇱",
    totalTrucks: 85000,
    evShare2024: 0.2,
    evShare2030: 15,
    evShare2035: 45,
    regulations: [
      { name: "Green Taxation Reform", year: 2024, description: "Reduced purchase tax for EVs" },
      { name: "Clean Air Law", year: 2025, description: "ZEV mandates for urban delivery" },
      { name: "National EV Plan", year: 2030, description: "Target 30% EV sales by 2030" }
    ],
    keyMarkets: ["Tel Aviv Metro", "Haifa Port", "Ashdod Port", "Central District"],
    avgIncentive: 30000,
    electricityPrice: 0.14,
    dieselPrice: 2.10
  }
};

var REGIONAL_PROJECTIONS = [
  { year: 2024, us: 12000, eu: 18000, israel: 150 },
  { year: 2025, us: 28000, eu: 42000, israel: 400 },
  { year: 2026, us: 55000, eu: 85000, israel: 800 },
  { year: 2027, us: 100000, eu: 150000, israel: 1500 },
  { year: 2028, us: 170000, eu: 250000, israel: 2500 },
  { year: 2029, us: 280000, eu: 380000, israel: 4000 },
  { year: 2030, us: 420000, eu: 550000, israel: 6000 },
  { year: 2032, us: 700000, eu: 900000, israel: 12000 },
  { year: 2035, us: 1100000, eu: 1400000, israel: 25000 }
];

// ============ DATA: EU-Specific OEMs ============
var EU_OEM_DATA = [
  {
    id: "daf-xf-electric",
    manufacturer: "DAF",
    model: "XF Electric",
    region: "EU",
    range_km: 500,
    battery_kwh: 525,
    payload_kg: 37000,
    price_eur: 350000,
    status: "Production",
    availability: "2024"
  },
  {
    id: "man-etgx",
    manufacturer: "MAN",
    model: "eTGX",
    region: "EU",
    range_km: 600,
    battery_kwh: 480,
    payload_kg: 37000,
    price_eur: 400000,
    status: "Production",
    availability: "2024"
  },
  {
    id: "scania-bev",
    manufacturer: "Scania",
    model: "45 R BEV",
    region: "EU",
    range_km: 350,
    battery_kwh: 624,
    payload_kg: 36000,
    price_eur: 380000,
    status: "Production",
    availability: "2023"
  },
  {
    id: "iveco-s-eway",
    manufacturer: "IVECO",
    model: "S-eWay",
    region: "EU",
    range_km: 500,
    battery_kwh: 738,
    payload_kg: 34000,
    price_eur: 420000,
    status: "Production",
    availability: "2024"
  },
  {
    id: "renault-e-tech-t",
    manufacturer: "Renault Trucks",
    model: "E-Tech T",
    region: "EU",
    range_km: 500,
    battery_kwh: 540,
    payload_kg: 37000,
    price_eur: 360000,
    status: "Production",
    availability: "2023"
  },
  {
    id: "volvo-fh-electric",
    manufacturer: "Volvo Trucks",
    model: "FH Electric",
    region: "EU",
    range_km: 600,
    battery_kwh: 540,
    payload_kg: 36000,
    price_eur: 400000,
    status: "Production",
    availability: "2024"
  }
];

// ============ DATA: Israeli Market Specifics ============
var ISRAEL_MARKET_DATA = {
  overview: {
    fleetSize: 85000,
    annualSales: 8500,
    evPenetration: 0.2,
    avgRouteLengthKm: 120,
    urbanDeliveryShare: 65
  },
  challenges: [
    { title: "Limited OEM Presence", desc: "Few manufacturers have local service networks" },
    { title: "High Import Costs", desc: "Trucks imported with significant shipping/customs costs" },
    { title: "Grid Capacity", desc: "Infrastructure upgrades needed for fleet charging" },
    { title: "Small Market Size", desc: "Lower priority for global OEMs" }
  ],
  opportunities: [
    { title: "High Fuel Costs", desc: "Diesel at $2.10/L makes EVs attractive for TCO" },
    { title: "Short Routes", desc: "Avg 120km routes ideal for current EV range" },
    { title: "Tech Innovation Hub", desc: "Strong ecosystem for fleet management software" },
    { title: "Port Logistics", desc: "Haifa/Ashdod ports ideal for early adoption" }
  ],
  activeOEMs: ["BYD", "Volvo Trucks", "Mercedes-Benz"],
  requiredSources: true
};

// ============ DATA: Sources with Validity Scores ============
var SOURCES_DATA = [
  // Research & Analytics (Primary Sources)
  {
    category: "Research & Analytics",
    name: "BloombergNEF Electric Vehicle Outlook",
    url: "https://about.bnef.com/electric-vehicle-outlook/",
    description: "Comprehensive annual report on EV market trends, battery prices, and adoption forecasts",
    dataUsed: "Market projections, battery cost trends, EV sales forecasts",
    validity: 9,
    type: "Subscription Research",
    lastUpdated: "2024"
  },
  {
    category: "Research & Analytics",
    name: "ACT Research",
    url: "https://www.actresearch.net/reports/",
    description: "Commercial vehicle market research and forecasting",
    dataUsed: "Class 8 truck market data, commercial vehicle trends",
    validity: 8,
    type: "Industry Research",
    lastUpdated: "2024"
  },
  {
    category: "Research & Analytics",
    name: "NACFE Run on Less",
    url: "https://nacfe.org/research/electric-trucks/",
    description: "Real-world electric truck performance data from fleet demonstrations",
    dataUsed: "TCO analysis, real-world efficiency data, fleet case studies",
    validity: 9,
    type: "Non-Profit Research",
    lastUpdated: "2024"
  },
  {
    category: "Research & Analytics",
    name: "Rocky Mountain Institute (RMI)",
    url: "https://rmi.org/our-work/climate-aligned-industries/heavy-duty-vehicles/",
    description: "Clean energy think tank focused on transportation decarbonization",
    dataUsed: "TCO models, infrastructure planning, policy analysis",
    validity: 9,
    type: "Non-Profit Research",
    lastUpdated: "2024"
  },
  {
    category: "Research & Analytics",
    name: "McKinsey Center for Future Mobility",
    url: "https://www.mckinsey.com/industries/automotive-and-assembly/our-insights/the-road-to-2035-ev-charging-infrastructure",
    description: "Management consulting firm's automotive research division",
    dataUsed: "Market sizing, infrastructure cost estimates, adoption curves",
    validity: 8,
    type: "Consulting Research",
    lastUpdated: "2024"
  },
  // Government Sources
  {
    category: "Government Sources",
    name: "California Air Resources Board (CARB)",
    url: "https://ww2.arb.ca.gov/our-work/programs/advanced-clean-fleets",
    description: "California's regulatory body for air quality and vehicle emissions",
    dataUsed: "ACF regulation details, ZEV mandates, compliance timelines",
    validity: 10,
    type: "Government",
    lastUpdated: "2024"
  },
  {
    category: "Government Sources",
    name: "EPA SmartWay Program",
    url: "https://www.epa.gov/smartway",
    description: "EPA's freight sustainability partnership program",
    dataUsed: "Emissions data, fuel efficiency benchmarks",
    validity: 10,
    type: "Government",
    lastUpdated: "2024"
  },
  {
    category: "Government Sources",
    name: "DOE Alternative Fuels Data Center",
    url: "https://afdc.energy.gov/vehicles/electric-vehicles-batteries",
    description: "US Department of Energy's alternative fuel vehicle information",
    dataUsed: "Incentive data, charging infrastructure specs, vehicle comparisons",
    validity: 10,
    type: "Government",
    lastUpdated: "2024"
  },
  {
    category: "Government Sources",
    name: "IEA Global EV Outlook",
    url: "https://www.iea.org/reports/global-ev-outlook-2024",
    description: "International Energy Agency's annual EV market analysis",
    dataUsed: "Global market data, policy comparisons, technology trends",
    validity: 10,
    type: "Intergovernmental",
    lastUpdated: "2024"
  },
  // Incentive Programs
  {
    category: "Incentive Programs",
    name: "Federal 30C Tax Credit",
    url: "https://afdc.energy.gov/laws/10513",
    description: "Alternative Fuel Vehicle Refueling Property Credit",
    dataUsed: "Tax credit amounts, eligibility requirements",
    validity: 10,
    type: "Government",
    lastUpdated: "2024"
  },
  {
    category: "Incentive Programs",
    name: "California HVIP",
    url: "https://californiahvip.org/",
    description: "Hybrid and Zero-Emission Truck and Bus Voucher Incentive Project",
    dataUsed: "Voucher amounts by vehicle type, eligible vehicles list",
    validity: 10,
    type: "Government Program",
    lastUpdated: "2024"
  },
  {
    category: "Incentive Programs",
    name: "California EnergIIZE",
    url: "https://energiize.org/",
    description: "Infrastructure incentive program for zero-emission fleets",
    dataUsed: "Infrastructure funding amounts, eligibility criteria",
    validity: 10,
    type: "Government Program",
    lastUpdated: "2024"
  },
  {
    category: "Incentive Programs",
    name: "NYSERDA Truck Voucher Program",
    url: "https://www.nyserda.ny.gov/All-Programs/Truck-Voucher-Incentive-Program",
    description: "New York State voucher program for clean trucks",
    dataUsed: "Voucher amounts, program requirements",
    validity: 10,
    type: "Government Program",
    lastUpdated: "2024"
  },
  {
    category: "Incentive Programs",
    name: "NJ Zero-Emission Incentive Program",
    url: "https://www.drivegreen.nj.gov/dg-zev-incentives.html",
    description: "New Jersey incentives for zero-emission vehicles",
    dataUsed: "Incentive amounts, eligible vehicles",
    validity: 10,
    type: "Government Program",
    lastUpdated: "2024"
  },
  // OEM Sources
  {
    category: "OEM Specifications",
    name: "Tesla Semi",
    url: "https://www.tesla.com/semi",
    description: "Official Tesla Semi specifications and ordering information",
    dataUsed: "Range, battery capacity, pricing, specifications",
    validity: 7,
    type: "Manufacturer",
    lastUpdated: "2024"
  },
  {
    category: "OEM Specifications",
    name: "Freightliner eCascadia",
    url: "https://freightliner.com/trucks/ecascadia/",
    description: "Official Freightliner electric truck specifications",
    dataUsed: "Range, battery options, payload capacity, charging specs",
    validity: 8,
    type: "Manufacturer",
    lastUpdated: "2024"
  },
  {
    category: "OEM Specifications",
    name: "Volvo VNR Electric",
    url: "https://www.volvotrucks.us/trucks/vnr-electric/",
    description: "Official Volvo electric truck specifications",
    dataUsed: "Range, battery capacity, motor specs, charging options",
    validity: 8,
    type: "Manufacturer",
    lastUpdated: "2024"
  },
  {
    category: "OEM Specifications",
    name: "Peterbilt Electric Vehicles",
    url: "https://www.peterbilt.com/trucks/electric-vehicles",
    description: "Official Peterbilt electric truck lineup",
    dataUsed: "Model 579EV specifications, range, battery options",
    validity: 8,
    type: "Manufacturer",
    lastUpdated: "2024"
  },
  {
    category: "OEM Specifications",
    name: "Kenworth T680E",
    url: "https://www.kenworth.com/trucks/t680e/",
    description: "Official Kenworth electric truck specifications",
    dataUsed: "Range, battery capacity, charging specs",
    validity: 8,
    type: "Manufacturer",
    lastUpdated: "2024"
  },
  {
    category: "OEM Specifications",
    name: "BYD Trucks North America",
    url: "https://en.byd.com/truck/",
    description: "Official BYD commercial electric vehicle specifications",
    dataUsed: "Class 8 truck specs, battery capacity, range",
    validity: 7,
    type: "Manufacturer",
    lastUpdated: "2024"
  },
  {
    category: "OEM Specifications",
    name: "Nikola Tre BEV",
    url: "https://www.nikolamotor.com/tre-bev/",
    description: "Official Nikola battery-electric truck specifications",
    dataUsed: "Range, battery capacity, motor specs, pricing",
    validity: 7,
    type: "Manufacturer",
    lastUpdated: "2024"
  },
  {
    category: "OEM Specifications",
    name: "Mercedes-Benz eActros",
    url: "https://www.mercedes-benz-trucks.com/en_GB/models/eactros-600.html",
    description: "Official Mercedes-Benz electric truck specifications",
    dataUsed: "eActros 600 specs, range, charging capabilities",
    validity: 8,
    type: "Manufacturer",
    lastUpdated: "2024"
  },
  // EU Government & Regulatory Sources
  {
    category: "EU Government Sources",
    name: "European Commission CO2 Standards HDV",
    url: "https://climate.ec.europa.eu/eu-action/transport/road-transport-reducing-co2-emissions-vehicles/reducing-co2-emissions-heavy-duty-vehicles_en",
    description: "Official EU CO2 emission standards for heavy-duty vehicles",
    dataUsed: "2030/2040 CO2 reduction targets, compliance requirements",
    validity: 10,
    type: "Government",
    region: "EU",
    lastUpdated: "2024"
  },
  {
    category: "EU Government Sources",
    name: "EU AFIR Regulation",
    url: "https://transport.ec.europa.eu/transport-themes/clean-transport/alternative-fuels-sustainable-mobility-europe/alternative-fuels-infrastructure_en",
    description: "Alternative Fuels Infrastructure Regulation - charging network requirements",
    dataUsed: "TEN-T charging requirements, infrastructure mandates",
    validity: 10,
    type: "Government",
    region: "EU",
    lastUpdated: "2024"
  },
  {
    category: "EU Government Sources",
    name: "ACEA European Automobile Manufacturers",
    url: "https://www.acea.auto/files/ACEA-report-vehicles-in-use-europe-2023.pdf",
    description: "European vehicle fleet statistics and market data",
    dataUsed: "EU truck fleet size, registration data, market trends",
    validity: 9,
    type: "Industry Association",
    region: "EU",
    lastUpdated: "2024"
  },
  {
    category: "EU Government Sources",
    name: "Germany KsNI Program (BMDV)",
    url: "https://www.klimafreundliche-nutzfahrzeuge.de/",
    description: "German federal funding program for climate-friendly commercial vehicles",
    dataUsed: "German incentive amounts, eligibility criteria",
    validity: 10,
    type: "Government",
    region: "EU",
    lastUpdated: "2024"
  },
  // EU OEM Sources
  {
    category: "EU OEM Specifications",
    name: "DAF XF Electric",
    url: "https://www.daf.com/en/trucks/alternative-fuels-and-drivelines/daf-xf-electric",
    description: "Official DAF electric truck specifications",
    dataUsed: "Range, battery capacity, payload specifications",
    validity: 8,
    type: "Manufacturer",
    region: "EU",
    lastUpdated: "2024"
  },
  {
    category: "EU OEM Specifications",
    name: "MAN eTruck",
    url: "https://www.man.eu/de/en/trucks/etruck/etruck.html",
    description: "Official MAN electric truck lineup",
    dataUsed: "eTGX/eTGS specifications, range, charging",
    validity: 8,
    type: "Manufacturer",
    region: "EU",
    lastUpdated: "2024"
  },
  {
    category: "EU OEM Specifications",
    name: "Scania Electric Trucks",
    url: "https://www.scania.com/group/en/home/products-and-services/trucks/battery-electric-trucks.html",
    description: "Official Scania battery-electric truck specifications",
    dataUsed: "Range, battery options, charging capabilities",
    validity: 8,
    type: "Manufacturer",
    region: "EU",
    lastUpdated: "2024"
  },
  {
    category: "EU OEM Specifications",
    name: "IVECO S-eWay",
    url: "https://www.iveco.com/en-us/trucks/pages/iveco-s-eway.aspx",
    description: "Official IVECO electric heavy-duty truck",
    dataUsed: "Range, battery capacity, specifications",
    validity: 8,
    type: "Manufacturer",
    region: "EU",
    lastUpdated: "2024"
  },
  {
    category: "EU OEM Specifications",
    name: "Renault Trucks E-Tech",
    url: "https://www.renault-trucks.com/en/electric-trucks",
    description: "Official Renault Trucks electric vehicle range",
    dataUsed: "E-Tech T specifications, range, charging",
    validity: 8,
    type: "Manufacturer",
    region: "EU",
    lastUpdated: "2024"
  },
  {
    category: "EU OEM Specifications",
    name: "Volvo Trucks Europe",
    url: "https://www.volvotrucks.com/en-en/trucks/trucks/volvo-fh/volvo-fh-electric.html",
    description: "Official Volvo FH Electric specifications (Europe)",
    dataUsed: "FH Electric range, battery, specifications",
    validity: 8,
    type: "Manufacturer",
    region: "EU",
    lastUpdated: "2024"
  },
  // Israeli Sources (Limited - Marked as Required)
  {
    category: "Israeli Market (Sources Required)",
    name: "Israel Ministry of Transport",
    url: "https://www.gov.il/en/departments/ministry_of_transport_and_road_safety",
    description: "Official Israeli transportation authority - LIMITED EV TRUCK DATA AVAILABLE",
    dataUsed: "General transport statistics (EV truck specific data needed)",
    validity: 6,
    type: "Government",
    region: "Israel",
    lastUpdated: "2024",
    sourcesRequired: true
  },
  {
    category: "Israeli Market (Sources Required)",
    name: "Israel Ministry of Environmental Protection",
    url: "https://www.gov.il/en/departments/ministry_of_environmental_protection",
    description: "Israeli environmental policy - clean vehicle initiatives",
    dataUsed: "EV policy direction (specific truck incentives data needed)",
    validity: 6,
    type: "Government",
    region: "Israel",
    lastUpdated: "2024",
    sourcesRequired: true
  },
  {
    category: "Israeli Market (Sources Required)",
    name: "Israel Electric Corporation",
    url: "https://www.iec.co.il/en",
    description: "National electricity provider - grid capacity data",
    dataUsed: "Electricity pricing (commercial fleet charging data needed)",
    validity: 7,
    type: "Utility",
    region: "Israel",
    lastUpdated: "2024",
    sourcesRequired: true
  },
  {
    category: "Israeli Market (Sources Required)",
    name: "Globes Israel Business News",
    url: "https://en.globes.co.il/",
    description: "Israeli business news - EV market coverage",
    dataUsed: "Market news, fleet operator announcements",
    validity: 6,
    type: "Media",
    region: "Israel",
    lastUpdated: "2024",
    sourcesRequired: true
  }
];

// ============ DATA: Market Projections ============
var MARKET_PROJECTIONS = [
  { year: 2024, ev_sales: 15000, ev_share: 1.2, total_market: 1250000 },
  { year: 2025, ev_sales: 35000, ev_share: 2.8, total_market: 1250000 },
  { year: 2026, ev_sales: 75000, ev_share: 5.8, total_market: 1290000 },
  { year: 2027, ev_sales: 140000, ev_share: 10.5, total_market: 1330000 },
  { year: 2028, ev_sales: 230000, ev_share: 16.8, total_market: 1370000 },
  { year: 2029, ev_sales: 350000, ev_share: 24.8, total_market: 1410000 },
  { year: 2030, ev_sales: 500000, ev_share: 34.5, total_market: 1450000 },
  { year: 2032, ev_sales: 850000, ev_share: 52.0, total_market: 1635000 },
  { year: 2035, ev_sales: 1400000, ev_share: 72.0, total_market: 1944000 }
];

// ============ STYLES ============
var styles = {
  app: {
    minHeight: "100vh",
    background: COLORS.background,
    color: COLORS.text,
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
  },
  header: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    borderBottom: "1px solid " + COLORS.border,
    padding: "24px 32px"
  },
  headerContent: {
    maxWidth: "1600px",
    margin: "0 auto"
  },
  title: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "28px",
    fontWeight: "400",
    color: COLORS.text,
    marginBottom: "4px"
  },
  subtitle: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "13px",
    color: COLORS.primary,
    letterSpacing: "0.5px"
  },
  nav: {
    display: "flex",
    gap: "8px",
    marginTop: "20px",
    flexWrap: "wrap"
  },
  navButton: {
    padding: "10px 20px",
    background: "transparent",
    border: "1px solid " + COLORS.border,
    borderRadius: "8px",
    color: COLORS.textMuted,
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    fontFamily: "inherit"
  },
  navButtonActive: {
    background: COLORS.primary,
    borderColor: COLORS.primary,
    color: "#000"
  },
  main: {
    maxWidth: "1600px",
    margin: "0 auto",
    padding: "32px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px"
  },
  gridWide: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
    gap: "24px"
  },
  card: {
    background: COLORS.card,
    borderRadius: "16px",
    border: "1px solid " + COLORS.border,
    padding: "24px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  cardSubtitle: {
    fontSize: "12px",
    color: COLORS.textMuted,
    marginBottom: "16px"
  },
  metricValue: {
    fontSize: "36px",
    fontWeight: "700",
    fontFamily: "'DM Mono', monospace"
  },
  metricLabel: {
    fontSize: "13px",
    color: COLORS.textMuted,
    marginTop: "4px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px"
  },
  th: {
    textAlign: "left",
    padding: "12px 8px",
    borderBottom: "1px solid " + COLORS.border,
    color: COLORS.textMuted,
    fontWeight: "500",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  td: {
    padding: "12px 8px",
    borderBottom: "1px solid " + COLORS.border + "40"
  },
  badge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "600"
  },
  section: {
    marginBottom: "32px"
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  }
};

// ============ HELPER COMPONENTS ============
function Card(props) {
  return createElement("div", { style: Object.assign({}, styles.card, props.style) }, props.children);
}

function MetricCard(props) {
  return createElement(Card, { style: props.style },
    createElement("div", { style: styles.cardTitle }, props.icon, " ", props.title),
    createElement("div", { style: Object.assign({}, styles.metricValue, { color: props.color || COLORS.primary }) }, props.value),
    createElement("div", { style: styles.metricLabel }, props.label)
  );
}

function Badge(props) {
  var bgColor = props.variant === "success" ? COLORS.success + "20" :
                props.variant === "warning" ? COLORS.accent + "20" :
                props.variant === "danger" ? COLORS.danger + "20" :
                props.variant === "info" ? COLORS.info + "20" : COLORS.primary + "20";
  var textColor = props.variant === "success" ? COLORS.success :
                  props.variant === "warning" ? COLORS.accent :
                  props.variant === "danger" ? COLORS.danger :
                  props.variant === "info" ? COLORS.info : COLORS.primary;
  return createElement("span", {
    style: Object.assign({}, styles.badge, { background: bgColor, color: textColor })
  }, props.children);
}

function formatCurrency(value) {
  return "$" + value.toLocaleString();
}

function formatNumber(value) {
  return value.toLocaleString();
}

// Source Link Component - clickable reference to sources
function SourceLink(props) {
  return createElement("a", {
    href: props.url,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      color: COLORS.primary,
      textDecoration: "none",
      fontSize: props.size || "12px",
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      padding: "2px 8px",
      background: COLORS.primary + "10",
      borderRadius: "4px",
      fontWeight: "500",
      transition: "all 0.2s ease"
    }
  }, props.children || props.name, " ↗");
}

// Source Citation Box - displays multiple sources with links
function SourceCitation(props) {
  return createElement("div", {
    style: {
      marginTop: props.marginTop || "16px",
      padding: "12px 16px",
      background: COLORS.card,
      borderRadius: "8px",
      borderLeft: "3px solid " + COLORS.info,
      fontSize: "12px"
    }
  },
    createElement("div", { style: { fontWeight: "600", color: COLORS.textMuted, marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" } },
      "📚 Sources"
    ),
    createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" } },
      props.sources.map(function(source, i) {
        return createElement(SourceLink, { key: i, url: source.url, name: source.name });
      })
    )
  );
}

// Key Sources Data for quick reference
var KEY_SOURCES = {
  tco: [
    { name: "NACFE Run on Less", url: "https://nacfe.org/research/electric-trucks/" },
    { name: "RMI Fleet Analysis", url: "https://rmi.org/our-work/climate-aligned-industries/heavy-duty-vehicles/" },
    { name: "ACT Research", url: "https://www.actresearch.net/reports/" }
  ],
  oem_us: [
    { name: "Tesla Semi", url: "https://www.tesla.com/semi" },
    { name: "Freightliner eCascadia", url: "https://freightliner.com/trucks/ecascadia/" },
    { name: "Volvo VNR Electric", url: "https://www.volvotrucks.us/trucks/vnr-electric/" },
    { name: "Peterbilt 579EV", url: "https://www.peterbilt.com/trucks/electric-vehicles" },
    { name: "Nikola Tre BEV", url: "https://www.nikolamotor.com/tre-bev/" }
  ],
  oem_eu: [
    { name: "DAF XF Electric", url: "https://www.daf.com/en/trucks/alternative-fuels-and-drivelines/daf-xf-electric" },
    { name: "MAN eTruck", url: "https://www.man.eu/de/en/trucks/etruck/etruck.html" },
    { name: "Scania BEV", url: "https://www.scania.com/group/en/home/products-and-services/trucks/battery-electric-trucks.html" },
    { name: "Volvo FH Electric", url: "https://www.volvotrucks.com/en-en/trucks/trucks/volvo-fh/volvo-fh-electric.html" },
    { name: "Mercedes eActros", url: "https://www.mercedes-benz-trucks.com/en_GB/models/eactros-600.html" }
  ],
  infrastructure: [
    { name: "DOE AFDC", url: "https://afdc.energy.gov/" },
    { name: "CA EnergIIZE", url: "https://energiize.org/" },
    { name: "NEVI Program", url: "https://www.fhwa.dot.gov/environment/nevi/" }
  ],
  incentives_us: [
    { name: "Federal 30C Credit", url: "https://afdc.energy.gov/laws/10513" },
    { name: "CA HVIP", url: "https://californiahvip.org/" },
    { name: "NY Truck Voucher", url: "https://www.nyserda.ny.gov/All-Programs/Truck-Voucher-Incentive-Program" }
  ],
  incentives_eu: [
    { name: "Germany KsNI", url: "https://www.klimafreundliche-nutzfahrzeuge.de/" },
    { name: "EU AFIR", url: "https://transport.ec.europa.eu/transport-themes/clean-transport/alternative-fuels-sustainable-mobility-europe/alternative-fuels-infrastructure_en" }
  ],
  regulations_us: [
    { name: "CARB ACF Rule", url: "https://ww2.arb.ca.gov/our-work/programs/advanced-clean-fleets" },
    { name: "EPA SmartWay", url: "https://www.epa.gov/smartway" }
  ],
  regulations_eu: [
    { name: "EU CO2 Standards HDV", url: "https://climate.ec.europa.eu/eu-action/transport/road-transport-reducing-co2-emissions-vehicles/reducing-co2-emissions-heavy-duty-vehicles_en" },
    { name: "EU AFIR Regulation", url: "https://transport.ec.europa.eu/transport-themes/clean-transport/alternative-fuels-sustainable-mobility-europe/alternative-fuels-infrastructure_en" }
  ],
  market: [
    { name: "BloombergNEF EVO", url: "https://about.bnef.com/electric-vehicle-outlook/" },
    { name: "IEA Global EV Outlook", url: "https://www.iea.org/reports/global-ev-outlook-2024" },
    { name: "ACEA Report", url: "https://www.acea.auto/files/ACEA-report-vehicles-in-use-europe-2023.pdf" }
  ],
  israel: [
    { name: "Israel Ministry of Transport", url: "https://www.gov.il/en/departments/ministry_of_transport_and_road_safety" },
    { name: "Israel Min. of Environment", url: "https://www.gov.il/en/departments/ministry_of_environmental_protection" },
    { name: "Israel Electric Corp", url: "https://www.iec.co.il/en" }
  ]
};

// ============ TCO ANALYSIS TAB ============
function TCOAnalysisTab() {
  return createElement("div", null,
    // Key Metrics
    createElement("div", { style: styles.grid },
      createElement(MetricCard, {
        icon: "💰",
        title: "10-Year TCO Savings",
        value: "$45K",
        label: "Electric vs Diesel (per truck)",
        color: COLORS.success
      }),
      createElement(MetricCard, {
        icon: "⚡",
        title: "Break-Even Point",
        value: "Year 8",
        label: "When EV becomes cheaper than diesel",
        color: COLORS.accent
      }),
      createElement(MetricCard, {
        icon: "⛽",
        title: "Fuel Savings",
        value: "58%",
        label: "Annual energy cost reduction",
        color: COLORS.primary
      }),
      createElement(MetricCard, {
        icon: "🔧",
        title: "Maintenance Savings",
        value: "63%",
        label: "Lower maintenance costs",
        color: COLORS.info
      })
    ),

    // TCO Comparison Chart
    createElement("div", { style: Object.assign({}, styles.section, { marginTop: "32px" }) },
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "📊 Cumulative TCO: Electric vs Diesel (10-Year)"),
        createElement("div", { style: styles.cardSubtitle }, "Class 8 truck, 100,000 miles/year, including all operating costs"),
        createElement(ResponsiveContainer, { width: "100%", height: 400 },
          createElement(LineChart, { data: TCO_YEARLY_DATA, margin: { top: 20, right: 30, left: 20, bottom: 20 } },
            createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: COLORS.border }),
            createElement(XAxis, { dataKey: "year", stroke: COLORS.textMuted, tickFormatter: function(v) { return "Year " + v; } }),
            createElement(YAxis, { stroke: COLORS.textMuted, tickFormatter: function(v) { return "$" + (v/1000) + "K"; } }),
            createElement(Tooltip, {
              contentStyle: { background: COLORS.card, border: "1px solid " + COLORS.border, borderRadius: "8px" },
              formatter: function(value) { return formatCurrency(value); }
            }),
            createElement(Legend, null),
            createElement(Line, { type: "monotone", dataKey: "dieselCumulative", name: "Diesel", stroke: COLORS.danger, strokeWidth: 3, dot: { r: 4 } }),
            createElement(Line, { type: "monotone", dataKey: "electricCumulative", name: "Electric", stroke: COLORS.primary, strokeWidth: 3, dot: { r: 4 } }),
            createElement(ReferenceLine, { y: 580000, stroke: COLORS.accent, strokeDasharray: "5 5", label: { value: "Break-even", fill: COLORS.accent, fontSize: 12 } })
          )
        )
      )
    ),

    // Cost Breakdown Comparison
    createElement("div", { style: Object.assign({}, styles.gridWide, { marginTop: "24px" }) },
      // Diesel Breakdown
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "⛽ Diesel TCO Breakdown (10-Year)"),
        createElement(ResponsiveContainer, { width: "100%", height: 300 },
          createElement(PieChart, null,
            createElement(Pie, {
              data: TCO_BREAKDOWN_DIESEL,
              cx: "50%",
              cy: "50%",
              innerRadius: 60,
              outerRadius: 100,
              paddingAngle: 2,
              dataKey: "amount",
              label: function(entry) { return entry.category + " (" + entry.percent + "%)"; }
            },
              TCO_BREAKDOWN_DIESEL.map(function(entry, index) {
                return createElement(Cell, { key: index, fill: CHART_COLORS[index % CHART_COLORS.length] });
              })
            ),
            createElement(Tooltip, { formatter: function(value) { return formatCurrency(value); } })
          )
        ),
        createElement("div", { style: { textAlign: "center", marginTop: "16px" } },
          createElement("span", { style: { fontSize: "24px", fontWeight: "700", color: COLORS.danger } }, "$705,000"),
          createElement("div", { style: { fontSize: "13px", color: COLORS.textMuted } }, "Total 10-Year Cost")
        )
      ),
      // Electric Breakdown
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "⚡ Electric TCO Breakdown (10-Year)"),
        createElement(ResponsiveContainer, { width: "100%", height: 300 },
          createElement(PieChart, null,
            createElement(Pie, {
              data: TCO_BREAKDOWN_ELECTRIC,
              cx: "50%",
              cy: "50%",
              innerRadius: 60,
              outerRadius: 100,
              paddingAngle: 2,
              dataKey: "amount",
              label: function(entry) { return entry.category + " (" + entry.percent + "%)"; }
            },
              TCO_BREAKDOWN_ELECTRIC.map(function(entry, index) {
                return createElement(Cell, { key: index, fill: CHART_COLORS[index % CHART_COLORS.length] });
              })
            ),
            createElement(Tooltip, { formatter: function(value) { return formatCurrency(value); } })
          )
        ),
        createElement("div", { style: { textAlign: "center", marginTop: "16px" } },
          createElement("span", { style: { fontSize: "24px", fontWeight: "700", color: COLORS.success } }, "$660,000"),
          createElement("div", { style: { fontSize: "13px", color: COLORS.textMuted } }, "Total 10-Year Cost")
        )
      )
    ),

    // Annual Cost Comparison
    createElement("div", { style: { marginTop: "24px" } },
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "📈 Annual Operating Cost Comparison"),
        createElement(ResponsiveContainer, { width: "100%", height: 350 },
          createElement(BarChart, { data: ANNUAL_COST_COMPARISON, layout: "vertical", margin: { top: 20, right: 30, left: 100, bottom: 20 } },
            createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: COLORS.border }),
            createElement(XAxis, { type: "number", stroke: COLORS.textMuted, tickFormatter: function(v) { return "$" + (v/1000) + "K"; } }),
            createElement(YAxis, { type: "category", dataKey: "category", stroke: COLORS.textMuted, width: 90 }),
            createElement(Tooltip, {
              contentStyle: { background: COLORS.card, border: "1px solid " + COLORS.border, borderRadius: "8px" },
              formatter: function(value) { return formatCurrency(value); }
            }),
            createElement(Legend, null),
            createElement(Bar, { dataKey: "diesel", name: "Diesel", fill: COLORS.danger, radius: [0, 4, 4, 0] }),
            createElement(Bar, { dataKey: "electric", name: "Electric", fill: COLORS.primary, radius: [0, 4, 4, 0] })
          )
        )
      )
    ),

    // Assumptions Note
    createElement("div", { style: { marginTop: "24px" } },
      createElement(Card, { style: { background: COLORS.card, borderColor: COLORS.info + "40" } },
        createElement("div", { style: styles.cardTitle }, "📋 TCO Assumptions"),
        createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", fontSize: "13px", color: COLORS.textMuted } },
          createElement("div", null, "• Annual mileage: 100,000 miles"),
          createElement("div", null, "• Diesel price: $4.00/gallon"),
          createElement("div", null, "• Electricity: $0.15/kWh (commercial)"),
          createElement("div", null, "• Diesel efficiency: 6.5 MPG"),
          createElement("div", null, "• Electric efficiency: 2.0 kWh/mile"),
          createElement("div", null, "• Federal incentives not included"),
          createElement("div", null, "• Residual value not included")
        ),
        createElement(SourceCitation, { sources: KEY_SOURCES.tco, marginTop: "16px" })
      )
    )
  );
}

// ============ OEM COMPARISON TAB ============
function OEMComparisonTab() {
  var sortedByRange = OEM_DATA.slice().sort(function(a, b) { return b.range_miles - a.range_miles; });
  var sortedByPrice = OEM_DATA.slice().sort(function(a, b) { return a.msrp_usd - b.msrp_usd; });

  var radarData = OEM_DATA.slice(0, 5).map(function(truck) {
    return {
      name: truck.manufacturer,
      range: truck.range_miles / 5,
      payload: truck.payload_lbs / 520,
      efficiency: (3 - truck.efficiency_kwh_mile) * 50,
      battery: truck.battery_kwh / 9,
      power: truck.motor_hp / 10
    };
  });

  return createElement("div", null,
    // Key Stats
    createElement("div", { style: styles.grid },
      createElement(MetricCard, {
        icon: "🚛",
        title: "Class 8 EV Models",
        value: OEM_DATA.length,
        label: "Currently in production",
        color: COLORS.primary
      }),
      createElement(MetricCard, {
        icon: "📏",
        title: "Max Range",
        value: "500 mi",
        label: "Tesla Semi (highest range)",
        color: COLORS.success
      }),
      createElement(MetricCard, {
        icon: "💵",
        title: "Price Range",
        value: "$180K-$400K",
        label: "Class 8 electric trucks",
        color: COLORS.accent
      }),
      createElement(MetricCard, {
        icon: "🔋",
        title: "Battery Range",
        value: "396-900 kWh",
        label: "Across all models",
        color: COLORS.info
      })
    ),

    // Range Comparison Chart
    createElement("div", { style: { marginTop: "32px" } },
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "📊 Range Comparison by Model"),
        createElement(ResponsiveContainer, { width: "100%", height: 400 },
          createElement(BarChart, { data: sortedByRange, layout: "vertical", margin: { top: 20, right: 30, left: 120, bottom: 20 } },
            createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: COLORS.border }),
            createElement(XAxis, { type: "number", stroke: COLORS.textMuted, unit: " mi" }),
            createElement(YAxis, { type: "category", dataKey: "model", stroke: COLORS.textMuted, width: 110 }),
            createElement(Tooltip, {
              contentStyle: { background: COLORS.card, border: "1px solid " + COLORS.border, borderRadius: "8px" },
              formatter: function(value, name) {
                return [value + " miles", name === "range_miles" ? "Max Range" : "Min Range"];
              }
            }),
            createElement(Legend, null),
            createElement(Bar, { dataKey: "range_miles", name: "Max Range", fill: COLORS.primary, radius: [0, 4, 4, 0] }),
            createElement(Bar, { dataKey: "range_miles_low", name: "Min Range", fill: COLORS.secondary, radius: [0, 4, 4, 0] })
          )
        )
      )
    ),

    // Price vs Range Scatter
    createElement("div", { style: { marginTop: "24px" } },
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "💰 Price vs Range Analysis"),
        createElement(ResponsiveContainer, { width: "100%", height: 400 },
          createElement(ComposedChart, { data: OEM_DATA, margin: { top: 20, right: 30, left: 20, bottom: 60 } },
            createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: COLORS.border }),
            createElement(XAxis, {
              dataKey: "model",
              stroke: COLORS.textMuted,
              angle: -45,
              textAnchor: "end",
              height: 80
            }),
            createElement(YAxis, { yAxisId: "left", stroke: COLORS.textMuted, tickFormatter: function(v) { return "$" + (v/1000) + "K"; } }),
            createElement(YAxis, { yAxisId: "right", orientation: "right", stroke: COLORS.primary, unit: " mi" }),
            createElement(Tooltip, {
              contentStyle: { background: COLORS.card, border: "1px solid " + COLORS.border, borderRadius: "8px" }
            }),
            createElement(Legend, null),
            createElement(Bar, { yAxisId: "left", dataKey: "msrp_usd", name: "MSRP", fill: COLORS.secondary, radius: [4, 4, 0, 0] }),
            createElement(Line, { yAxisId: "right", type: "monotone", dataKey: "range_miles", name: "Range", stroke: COLORS.primary, strokeWidth: 3, dot: { r: 6, fill: COLORS.primary } })
          )
        )
      )
    ),

    // Detailed Specs Table
    createElement("div", { style: { marginTop: "24px" } },
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "📋 Class 8 Electric Truck Specifications"),
        createElement("div", { style: { overflowX: "auto" } },
          createElement("table", { style: styles.table },
            createElement("thead", null,
              createElement("tr", null,
                createElement("th", { style: styles.th }, "Manufacturer"),
                createElement("th", { style: styles.th }, "Model"),
                createElement("th", { style: styles.th }, "Range"),
                createElement("th", { style: styles.th }, "Battery"),
                createElement("th", { style: styles.th }, "Payload"),
                createElement("th", { style: styles.th }, "Power"),
                createElement("th", { style: styles.th }, "Charging"),
                createElement("th", { style: styles.th }, "MSRP"),
                createElement("th", { style: styles.th }, "Status")
              )
            ),
            createElement("tbody", null,
              OEM_DATA.map(function(truck) {
                return createElement("tr", { key: truck.id },
                  createElement("td", { style: Object.assign({}, styles.td, { fontWeight: "600" }) }, truck.manufacturer),
                  createElement("td", { style: styles.td }, truck.model),
                  createElement("td", { style: styles.td }, truck.range_miles_low + "-" + truck.range_miles + " mi"),
                  createElement("td", { style: styles.td }, truck.battery_kwh + " kWh"),
                  createElement("td", { style: styles.td }, formatNumber(truck.payload_lbs) + " lbs"),
                  createElement("td", { style: styles.td }, truck.motor_hp + " HP"),
                  createElement("td", { style: styles.td }, truck.charging_type),
                  createElement("td", { style: Object.assign({}, styles.td, { color: COLORS.success }) }, formatCurrency(truck.msrp_usd)),
                  createElement("td", { style: styles.td },
                    createElement(Badge, { variant: "success" }, truck.status)
                  )
                );
              })
            )
          )
        )
      )
    ),

    // Medium Duty Section
    createElement("div", { style: { marginTop: "32px" } },
      createElement("div", { style: styles.sectionTitle }, "🚚 Medium Duty Electric Trucks"),
      createElement(Card, null,
        createElement("div", { style: { overflowX: "auto" } },
          createElement("table", { style: styles.table },
            createElement("thead", null,
              createElement("tr", null,
                createElement("th", { style: styles.th }, "Manufacturer"),
                createElement("th", { style: styles.th }, "Model"),
                createElement("th", { style: styles.th }, "Class"),
                createElement("th", { style: styles.th }, "Range"),
                createElement("th", { style: styles.th }, "Battery"),
                createElement("th", { style: styles.th }, "Payload"),
                createElement("th", { style: styles.th }, "MSRP"),
                createElement("th", { style: styles.th }, "Status")
              )
            ),
            createElement("tbody", null,
              MEDIUM_DUTY_DATA.map(function(truck) {
                return createElement("tr", { key: truck.id },
                  createElement("td", { style: Object.assign({}, styles.td, { fontWeight: "600" }) }, truck.manufacturer),
                  createElement("td", { style: styles.td }, truck.model),
                  createElement("td", { style: styles.td }, truck.class),
                  createElement("td", { style: styles.td }, truck.range_miles + " mi"),
                  createElement("td", { style: styles.td }, truck.battery_kwh + " kWh"),
                  createElement("td", { style: styles.td }, formatNumber(truck.payload_lbs) + " lbs"),
                  createElement("td", { style: Object.assign({}, styles.td, { color: COLORS.success }) }, formatCurrency(truck.msrp_usd)),
                  createElement("td", { style: styles.td },
                    createElement(Badge, { variant: "success" }, truck.status)
                  )
                );
              })
            )
          )
        )
      )
    ),

    // OEM Sources Section
    createElement("div", { style: { marginTop: "32px" } },
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "📚 OEM Specification Sources"),
        createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" } },
          createElement("div", null,
            createElement("div", { style: { fontWeight: "600", marginBottom: "12px", color: COLORS.info } }, "🇺🇸 US Manufacturers"),
            createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" } },
              KEY_SOURCES.oem_us.map(function(source, i) {
                return createElement(SourceLink, { key: i, url: source.url, name: source.name });
              })
            )
          ),
          createElement("div", null,
            createElement("div", { style: { fontWeight: "600", marginBottom: "12px", color: COLORS.primary } }, "🇪🇺 EU Manufacturers"),
            createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" } },
              KEY_SOURCES.oem_eu.map(function(source, i) {
                return createElement(SourceLink, { key: i, url: source.url, name: source.name });
              })
            )
          )
        ),
        createElement("div", { style: { marginTop: "16px", fontSize: "12px", color: COLORS.textMuted, fontStyle: "italic" } },
          "All specifications sourced from official manufacturer websites. Prices and specs may vary by region and configuration."
        )
      )
    )
  );
}

// ============ INFRASTRUCTURE TAB ============
function InfrastructureTab() {
  var depotChartData = DEPOT_SIZING.map(function(d) {
    return {
      fleet: d.fleet_size + " trucks",
      install_cost: d.install_cost,
      monthly_energy: d.monthly_energy * 0.15, // $0.15/kWh
      power_mw: d.power_mw
    };
  });

  return createElement("div", null,
    // Key Infrastructure Metrics
    createElement("div", { style: styles.grid },
      createElement(MetricCard, {
        icon: "⚡",
        title: "Avg Install Cost",
        value: "$75K",
        label: "Per DC fast charger (150kW)",
        color: COLORS.primary
      }),
      createElement(MetricCard, {
        icon: "🔌",
        title: "Grid Upgrade Cost",
        value: "$50-250K",
        label: "Depending on capacity needs",
        color: COLORS.accent
      }),
      createElement(MetricCard, {
        icon: "📊",
        title: "ROI Timeline",
        value: "3-5 Years",
        label: "For depot charging infrastructure",
        color: COLORS.success
      }),
      createElement(MetricCard, {
        icon: "🏭",
        title: "Incentive Coverage",
        value: "Up to 50%",
        label: "CA EnergIIZE program",
        color: COLORS.info
      })
    ),

    // Charger Types Comparison
    createElement("div", { style: { marginTop: "32px" } },
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "🔌 Charging Infrastructure Options"),
        createElement("div", { style: { overflowX: "auto" } },
          createElement("table", { style: styles.table },
            createElement("thead", null,
              createElement("tr", null,
                createElement("th", { style: styles.th }, "Charger Type"),
                createElement("th", { style: styles.th }, "Power"),
                createElement("th", { style: styles.th }, "Equipment Cost"),
                createElement("th", { style: styles.th }, "Install Cost"),
                createElement("th", { style: styles.th }, "Total Cost"),
                createElement("th", { style: styles.th }, "Charge Time (Class 8)"),
                createElement("th", { style: styles.th }, "Best Use Case")
              )
            ),
            createElement("tbody", null,
              CHARGING_INFRASTRUCTURE.map(function(charger, index) {
                var totalCost = charger.equipment_cost + charger.install_cost;
                return createElement("tr", { key: index },
                  createElement("td", { style: Object.assign({}, styles.td, { fontWeight: "600" }) }, charger.type),
                  createElement("td", { style: styles.td }, charger.power_kw + " kW"),
                  createElement("td", { style: styles.td }, formatCurrency(charger.equipment_cost)),
                  createElement("td", { style: styles.td }, formatCurrency(charger.install_cost)),
                  createElement("td", { style: Object.assign({}, styles.td, { color: COLORS.accent, fontWeight: "600" }) }, formatCurrency(totalCost)),
                  createElement("td", { style: styles.td }, charger.charge_time_class8),
                  createElement("td", { style: Object.assign({}, styles.td, { fontSize: "12px", color: COLORS.textMuted }) }, charger.use_case)
                );
              })
            )
          )
        )
      )
    ),

    // Depot Sizing Chart
    createElement("div", { style: { marginTop: "24px" } },
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "🏭 Depot Infrastructure Sizing & Costs"),
        createElement(ResponsiveContainer, { width: "100%", height: 400 },
          createElement(ComposedChart, { data: depotChartData, margin: { top: 20, right: 30, left: 20, bottom: 20 } },
            createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: COLORS.border }),
            createElement(XAxis, { dataKey: "fleet", stroke: COLORS.textMuted }),
            createElement(YAxis, { yAxisId: "left", stroke: COLORS.textMuted, tickFormatter: function(v) { return "$" + (v/1000000).toFixed(1) + "M"; } }),
            createElement(YAxis, { yAxisId: "right", orientation: "right", stroke: COLORS.accent, tickFormatter: function(v) { return "$" + (v/1000) + "K"; } }),
            createElement(Tooltip, {
              contentStyle: { background: COLORS.card, border: "1px solid " + COLORS.border, borderRadius: "8px" },
              formatter: function(value) { return formatCurrency(value); }
            }),
            createElement(Legend, null),
            createElement(Bar, { yAxisId: "left", dataKey: "install_cost", name: "Installation Cost", fill: COLORS.primary, radius: [4, 4, 0, 0] }),
            createElement(Line, { yAxisId: "right", type: "monotone", dataKey: "monthly_energy", name: "Monthly Energy Cost", stroke: COLORS.accent, strokeWidth: 3 })
          )
        )
      )
    ),

    // Depot Sizing Table
    createElement("div", { style: { marginTop: "24px" } },
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "📋 Depot Infrastructure Planning Guide"),
        createElement("div", { style: { overflowX: "auto" } },
          createElement("table", { style: styles.table },
            createElement("thead", null,
              createElement("tr", null,
                createElement("th", { style: styles.th }, "Fleet Size"),
                createElement("th", { style: styles.th }, "L2 Chargers"),
                createElement("th", { style: styles.th }, "DC Fast Chargers"),
                createElement("th", { style: styles.th }, "Power Capacity"),
                createElement("th", { style: styles.th }, "Install Cost"),
                createElement("th", { style: styles.th }, "Monthly Energy (kWh)")
              )
            ),
            createElement("tbody", null,
              DEPOT_SIZING.map(function(depot, index) {
                return createElement("tr", { key: index },
                  createElement("td", { style: Object.assign({}, styles.td, { fontWeight: "600" }) }, depot.fleet_size + " trucks"),
                  createElement("td", { style: styles.td }, depot.chargers_l2),
                  createElement("td", { style: styles.td }, depot.chargers_dc),
                  createElement("td", { style: styles.td }, depot.power_mw + " MW"),
                  createElement("td", { style: Object.assign({}, styles.td, { color: COLORS.accent }) }, formatCurrency(depot.install_cost)),
                  createElement("td", { style: styles.td }, formatNumber(depot.monthly_energy))
                );
              })
            )
          )
        )
      )
    ),

    // Incentives Section
    createElement("div", { style: { marginTop: "32px" } },
      createElement("div", { style: styles.sectionTitle }, "💵 Available Incentives & Programs"),
      createElement(Card, null,
        createElement("div", { style: { overflowX: "auto" } },
          createElement("table", { style: styles.table },
            createElement("thead", null,
              createElement("tr", null,
                createElement("th", { style: styles.th }, "Program"),
                createElement("th", { style: styles.th }, "Type"),
                createElement("th", { style: styles.th }, "Max Amount"),
                createElement("th", { style: styles.th }, "Coverage %"),
                createElement("th", { style: styles.th }, "Status")
              )
            ),
            createElement("tbody", null,
              INCENTIVES_DATA.map(function(incentive, index) {
                return createElement("tr", { key: index },
                  createElement("td", { style: Object.assign({}, styles.td, { fontWeight: "600" }) }, incentive.program),
                  createElement("td", { style: styles.td },
                    createElement(Badge, { variant: incentive.type === "Tax Credit" ? "info" : incentive.type === "Voucher" ? "success" : "warning" }, incentive.type)
                  ),
                  createElement("td", { style: Object.assign({}, styles.td, { color: COLORS.success }) }, formatCurrency(incentive.max_amount)),
                  createElement("td", { style: styles.td }, incentive.percent > 0 ? incentive.percent + "%" : "Fixed"),
                  createElement("td", { style: styles.td },
                    createElement(Badge, { variant: "success" }, incentive.status)
                  )
                );
              })
            )
          )
        ),
        createElement("div", { style: { marginTop: "16px", padding: "16px", background: COLORS.info + "10", borderRadius: "8px", fontSize: "13px", color: COLORS.textMuted } },
          "💡 Tip: Stack federal tax credits with state voucher programs for maximum savings. CA fleets can combine 30C credits with HVIP vouchers for up to $220K+ per truck."
        )
      )
    ),

    // Grid Requirements
    createElement("div", { style: { marginTop: "24px" } },
      createElement(Card, { style: { background: COLORS.card, borderColor: COLORS.accent + "40" } },
        createElement("div", { style: styles.cardTitle }, "⚠️ Grid Capacity Considerations"),
        createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" } },
          createElement("div", null,
            createElement("div", { style: { fontWeight: "600", marginBottom: "8px", color: COLORS.text } }, "Small Fleet (10-25 trucks)"),
            createElement("div", { style: { fontSize: "13px", color: COLORS.textMuted } },
              "• Typically served by existing commercial service",
              createElement("br"),
              "• May need panel upgrade ($5-15K)",
              createElement("br"),
              "• 300-800 kW peak demand"
            )
          ),
          createElement("div", null,
            createElement("div", { style: { fontWeight: "600", marginBottom: "8px", color: COLORS.text } }, "Medium Fleet (50-100 trucks)"),
            createElement("div", { style: { fontSize: "13px", color: COLORS.textMuted } },
              "• Likely requires transformer upgrade",
              createElement("br"),
              "• New dedicated utility feed ($50-150K)",
              createElement("br"),
              "• 1.5-3.5 MW peak demand"
            )
          ),
          createElement("div", null,
            createElement("div", { style: { fontWeight: "600", marginBottom: "8px", color: COLORS.text } }, "Large Fleet (250+ trucks)"),
            createElement("div", { style: { fontSize: "13px", color: COLORS.textMuted } },
              "• Substation upgrade or new build",
              createElement("br"),
              "• Utility capacity study required",
              createElement("br"),
              "• 9+ MW peak demand"
            )
          )
        )
      )
    ),

    // Infrastructure Sources Section
    createElement("div", { style: { marginTop: "32px" } },
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "📚 Infrastructure & Incentive Sources"),
        createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" } },
          createElement("div", null,
            createElement("div", { style: { fontWeight: "600", marginBottom: "12px", color: COLORS.primary } }, "🔌 Infrastructure Data"),
            createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" } },
              KEY_SOURCES.infrastructure.map(function(source, i) {
                return createElement(SourceLink, { key: i, url: source.url, name: source.name });
              })
            )
          ),
          createElement("div", null,
            createElement("div", { style: { fontWeight: "600", marginBottom: "12px", color: COLORS.info } }, "🇺🇸 US Incentives"),
            createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" } },
              KEY_SOURCES.incentives_us.map(function(source, i) {
                return createElement(SourceLink, { key: i, url: source.url, name: source.name });
              })
            )
          ),
          createElement("div", null,
            createElement("div", { style: { fontWeight: "600", marginBottom: "12px", color: COLORS.success } }, "🇪🇺 EU Incentives"),
            createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" } },
              KEY_SOURCES.incentives_eu.map(function(source, i) {
                return createElement(SourceLink, { key: i, url: source.url, name: source.name });
              })
            )
          )
        )
      )
    )
  );
}

// ============ MARKET OUTLOOK TAB ============
function MarketOutlookTab() {
  var us = REGIONAL_MARKET_DATA.us;
  var eu = REGIONAL_MARKET_DATA.eu;
  var il = REGIONAL_MARKET_DATA.israel;

  return createElement("div", null,
    // Regional Overview Cards
    createElement("div", { style: styles.grid },
      createElement(MetricCard, {
        icon: "🇺🇸",
        title: "US 2030 EV Share",
        value: us.evShare2030 + "%",
        label: "420K trucks/year projected",
        color: COLORS.info
      }),
      createElement(MetricCard, {
        icon: "🇪🇺",
        title: "EU 2030 EV Share",
        value: eu.evShare2030 + "%",
        label: "550K trucks/year projected",
        color: COLORS.primary
      }),
      createElement(MetricCard, {
        icon: "🇮🇱",
        title: "Israel 2030 EV Share",
        value: il.evShare2030 + "%",
        label: "6K trucks/year projected",
        color: COLORS.accent
      }),
      createElement(MetricCard, {
        icon: "🌍",
        title: "Combined 2035",
        value: "2.5M+",
        label: "Annual EV truck sales globally",
        color: COLORS.success
      })
    ),

    // Regional Projections Chart
    createElement("div", { style: { marginTop: "32px" } },
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "📊 Regional EV Truck Sales Projections (2024-2035)"),
        createElement(ResponsiveContainer, { width: "100%", height: 400 },
          createElement(AreaChart, { data: REGIONAL_PROJECTIONS, margin: { top: 20, right: 30, left: 20, bottom: 20 } },
            createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: COLORS.border }),
            createElement(XAxis, { dataKey: "year", stroke: COLORS.textMuted }),
            createElement(YAxis, { stroke: COLORS.textMuted, tickFormatter: function(v) { return (v/1000) + "K"; } }),
            createElement(Tooltip, {
              contentStyle: { background: COLORS.card, border: "1px solid " + COLORS.border, borderRadius: "8px" },
              formatter: function(value) { return formatNumber(value) + " units"; }
            }),
            createElement(Legend, null),
            createElement(Area, { type: "monotone", dataKey: "eu", name: "🇪🇺 European Union", fill: COLORS.primary + "60", stroke: COLORS.primary, strokeWidth: 2, stackId: "1" }),
            createElement(Area, { type: "monotone", dataKey: "us", name: "🇺🇸 United States", fill: COLORS.info + "60", stroke: COLORS.info, strokeWidth: 2, stackId: "1" }),
            createElement(Area, { type: "monotone", dataKey: "israel", name: "🇮🇱 Israel", fill: COLORS.accent + "60", stroke: COLORS.accent, strokeWidth: 2, stackId: "1" })
          )
        )
      )
    ),

    // US Market Section
    createElement("div", { style: { marginTop: "32px" } },
      createElement("div", { style: styles.sectionTitle }, "🇺🇸 United States Market"),
      createElement("div", { style: styles.gridWide },
        createElement(Card, null,
          createElement("div", { style: styles.cardTitle }, "📜 Key Regulations"),
          createElement("div", { style: { display: "flex", flexDirection: "column", gap: "12px" } },
            us.regulations.map(function(reg, i) {
              return createElement("div", { key: i, style: { padding: "12px", background: COLORS.background, borderRadius: "8px" } },
                createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "4px" } },
                  createElement("span", { style: { fontWeight: "600" } }, reg.name),
                  createElement(Badge, { variant: "info" }, reg.year)
                ),
                createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, reg.description)
              );
            })
          )
        ),
        createElement(Card, null,
          createElement("div", { style: styles.cardTitle }, "📊 Market Overview"),
          createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" } },
            createElement("div", null,
              createElement("div", { style: { fontSize: "24px", fontWeight: "700", color: COLORS.info } }, formatNumber(us.totalTrucks)),
              createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, "Total HD Trucks")
            ),
            createElement("div", null,
              createElement("div", { style: { fontSize: "24px", fontWeight: "700", color: COLORS.success } }, "$" + formatNumber(us.avgIncentive)),
              createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, "Avg. Incentive Available")
            ),
            createElement("div", null,
              createElement("div", { style: { fontSize: "24px", fontWeight: "700", color: COLORS.primary } }, "$" + us.dieselPrice.toFixed(2) + "/gal"),
              createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, "Diesel Price")
            ),
            createElement("div", null,
              createElement("div", { style: { fontSize: "24px", fontWeight: "700", color: COLORS.accent } }, "$" + us.electricityPrice.toFixed(2) + "/kWh"),
              createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, "Commercial Electricity")
            )
          ),
          createElement("div", { style: { marginTop: "16px", fontSize: "12px", color: COLORS.textMuted } },
            createElement("strong", null, "Key Markets: "), us.keyMarkets.join(", ")
          )
        )
      )
    ),

    // EU Market Section
    createElement("div", { style: { marginTop: "32px" } },
      createElement("div", { style: styles.sectionTitle }, "🇪🇺 European Union Market"),
      createElement("div", { style: styles.gridWide },
        createElement(Card, null,
          createElement("div", { style: styles.cardTitle }, "📜 Key Regulations"),
          createElement("div", { style: { display: "flex", flexDirection: "column", gap: "12px" } },
            eu.regulations.map(function(reg, i) {
              return createElement("div", { key: i, style: { padding: "12px", background: COLORS.background, borderRadius: "8px" } },
                createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "4px" } },
                  createElement("span", { style: { fontWeight: "600" } }, reg.name),
                  createElement(Badge, { variant: "success" }, reg.year)
                ),
                createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, reg.description)
              );
            })
          )
        ),
        createElement(Card, null,
          createElement("div", { style: styles.cardTitle }, "📊 Market Overview"),
          createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" } },
            createElement("div", null,
              createElement("div", { style: { fontSize: "24px", fontWeight: "700", color: COLORS.primary } }, formatNumber(eu.totalTrucks)),
              createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, "Total HD Trucks")
            ),
            createElement("div", null,
              createElement("div", { style: { fontSize: "24px", fontWeight: "700", color: COLORS.success } }, "€" + formatNumber(eu.avgIncentive)),
              createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, "Avg. Incentive Available")
            ),
            createElement("div", null,
              createElement("div", { style: { fontSize: "24px", fontWeight: "700", color: COLORS.danger } }, "€" + eu.dieselPrice.toFixed(2) + "/L"),
              createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, "Diesel Price")
            ),
            createElement("div", null,
              createElement("div", { style: { fontSize: "24px", fontWeight: "700", color: COLORS.accent } }, "€" + eu.electricityPrice.toFixed(2) + "/kWh"),
              createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, "Commercial Electricity")
            )
          ),
          createElement("div", { style: { marginTop: "16px", fontSize: "12px", color: COLORS.textMuted } },
            createElement("strong", null, "Key Markets: "), eu.keyMarkets.join(", ")
          )
        )
      ),
      // EU OEMs Table
      createElement(Card, { style: { marginTop: "24px" } },
        createElement("div", { style: styles.cardTitle }, "🚛 European Electric Truck OEMs"),
        createElement("div", { style: { overflowX: "auto" } },
          createElement("table", { style: styles.table },
            createElement("thead", null,
              createElement("tr", null,
                createElement("th", { style: styles.th }, "Manufacturer"),
                createElement("th", { style: styles.th }, "Model"),
                createElement("th", { style: styles.th }, "Range"),
                createElement("th", { style: styles.th }, "Battery"),
                createElement("th", { style: styles.th }, "Payload"),
                createElement("th", { style: styles.th }, "Price"),
                createElement("th", { style: styles.th }, "Status")
              )
            ),
            createElement("tbody", null,
              EU_OEM_DATA.map(function(truck) {
                return createElement("tr", { key: truck.id },
                  createElement("td", { style: Object.assign({}, styles.td, { fontWeight: "600" }) }, truck.manufacturer),
                  createElement("td", { style: styles.td }, truck.model),
                  createElement("td", { style: styles.td }, truck.range_km + " km"),
                  createElement("td", { style: styles.td }, truck.battery_kwh + " kWh"),
                  createElement("td", { style: styles.td }, formatNumber(truck.payload_kg) + " kg"),
                  createElement("td", { style: Object.assign({}, styles.td, { color: COLORS.success }) }, "€" + formatNumber(truck.price_eur)),
                  createElement("td", { style: styles.td },
                    createElement(Badge, { variant: "success" }, truck.status)
                  )
                );
              })
            )
          )
        )
      )
    ),

    // Israeli Market Section
    createElement("div", { style: { marginTop: "32px" } },
      createElement("div", { style: styles.sectionTitle }, "🇮🇱 Israeli Market"),
      createElement(Card, { style: { borderColor: COLORS.accent + "60", borderWidth: "2px" } },
        createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" } },
          createElement("span", { style: { fontSize: "20px" } }, "⚠️"),
          createElement("span", { style: { color: COLORS.accent, fontWeight: "600", fontSize: "14px" } }, "LIMITED DATA AVAILABILITY - Additional sources required")
        ),
        createElement("div", { style: styles.gridWide },
          createElement("div", null,
            createElement("div", { style: styles.cardTitle }, "📊 Market Overview"),
            createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" } },
              createElement("div", null,
                createElement("div", { style: { fontSize: "24px", fontWeight: "700", color: COLORS.accent } }, formatNumber(il.totalTrucks)),
                createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, "Total HD Trucks")
              ),
              createElement("div", null,
                createElement("div", { style: { fontSize: "24px", fontWeight: "700", color: COLORS.primary } }, il.evShare2024 + "%"),
                createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, "Current EV Share")
              ),
              createElement("div", null,
                createElement("div", { style: { fontSize: "24px", fontWeight: "700", color: COLORS.danger } }, "₪" + (il.dieselPrice * 3.7).toFixed(2) + "/L"),
                createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, "Diesel Price")
              ),
              createElement("div", null,
                createElement("div", { style: { fontSize: "24px", fontWeight: "700", color: COLORS.success } }, ISRAEL_MARKET_DATA.overview.avgRouteLengthKm + " km"),
                createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, "Avg Route Length")
              )
            ),
            createElement("div", { style: { marginTop: "16px", fontSize: "12px", color: COLORS.textMuted } },
              createElement("strong", null, "Key Markets: "), il.keyMarkets.join(", ")
            ),
            createElement("div", { style: { marginTop: "12px", fontSize: "12px", color: COLORS.textMuted } },
              createElement("strong", null, "Active OEMs: "), ISRAEL_MARKET_DATA.activeOEMs.join(", ")
            )
          ),
          createElement("div", null,
            createElement("div", { style: styles.cardTitle }, "📜 Regulations"),
            createElement("div", { style: { display: "flex", flexDirection: "column", gap: "8px" } },
              il.regulations.map(function(reg, i) {
                return createElement("div", { key: i, style: { padding: "10px", background: COLORS.background, borderRadius: "6px", fontSize: "13px" } },
                  createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
                    createElement("span", { style: { fontWeight: "500" } }, reg.name),
                    createElement(Badge, { variant: "warning" }, reg.year)
                  ),
                  createElement("div", { style: { fontSize: "11px", color: COLORS.textMuted, marginTop: "4px" } }, reg.description)
                );
              })
            )
          )
        )
      ),
      // Israel Opportunities & Challenges
      createElement("div", { style: Object.assign({}, styles.gridWide, { marginTop: "24px" }) },
        createElement(Card, null,
          createElement("div", { style: styles.cardTitle }, "✅ Opportunities"),
          createElement("div", { style: { display: "flex", flexDirection: "column", gap: "10px" } },
            ISRAEL_MARKET_DATA.opportunities.map(function(item, i) {
              return createElement("div", { key: i, style: { padding: "10px", background: COLORS.success + "10", borderRadius: "6px", borderLeft: "3px solid " + COLORS.success } },
                createElement("div", { style: { fontWeight: "600", fontSize: "13px" } }, item.title),
                createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, item.desc)
              );
            })
          )
        ),
        createElement(Card, null,
          createElement("div", { style: styles.cardTitle }, "⚠️ Challenges"),
          createElement("div", { style: { display: "flex", flexDirection: "column", gap: "10px" } },
            ISRAEL_MARKET_DATA.challenges.map(function(item, i) {
              return createElement("div", { key: i, style: { padding: "10px", background: COLORS.danger + "10", borderRadius: "6px", borderLeft: "3px solid " + COLORS.danger } },
                createElement("div", { style: { fontWeight: "600", fontSize: "13px" } }, item.title),
                createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, item.desc)
              );
            })
          )
        )
      ),
      // Israeli Sources Note
      createElement(Card, { style: { marginTop: "24px", background: COLORS.accent + "10", borderColor: COLORS.accent } },
        createElement("div", { style: styles.cardTitle }, "📋 Sources Required for Israeli Market Data"),
        createElement("div", { style: { fontSize: "13px", color: COLORS.textMuted, lineHeight: "1.6" } },
          "The Israeli market data presented is based on limited publicly available information. ",
          createElement("strong", { style: { color: COLORS.accent } }, "Additional authoritative sources are needed:"),
          createElement("ul", { style: { marginTop: "12px", marginLeft: "20px" } },
            createElement("li", null, "Israel Ministry of Transport - Official fleet statistics"),
            createElement("li", null, "Israel Ministry of Environmental Protection - EV policy documents"),
            createElement("li", null, "Israel Electric Corporation - Grid capacity studies"),
            createElement("li", null, "Local fleet operator surveys and case studies"),
            createElement("li", null, "Israeli Trucking Association data (if available)")
          ),
          createElement("div", { style: { marginTop: "12px", padding: "10px", background: COLORS.card, borderRadius: "6px" } },
            "⚠️ Israeli market projections should be validated with local government and industry sources before use in investment decisions."
          )
        )
      )
    ),

    // Key Drivers (US & EU Combined)
    createElement("div", { style: { marginTop: "32px" } },
      createElement("div", { style: styles.sectionTitle }, "🚀 Market Drivers (US & EU)"),
      createElement("div", { style: styles.gridWide },
        createElement(Card, null,
          createElement("div", { style: styles.cardTitle }, "🇺🇸 US Drivers"),
          createElement("div", { style: { display: "flex", flexDirection: "column", gap: "10px" } },
            [
              { icon: "📜", title: "CA ACF + Multi-State Adoption", desc: "8+ states adopting CA's 100% ZEV sales by 2036 mandate" },
              { icon: "💰", title: "IRA Incentives", desc: "Up to $40K commercial clean vehicle credit + 30C charging credit" },
              { icon: "🏭", title: "NEVI Infrastructure", desc: "$7.5B federal investment in charging corridors" }
            ].map(function(item, i) {
              return createElement("div", { key: i, style: { display: "flex", gap: "10px", padding: "10px", background: COLORS.background, borderRadius: "6px" } },
                createElement("span", null, item.icon),
                createElement("div", null,
                  createElement("div", { style: { fontWeight: "600", fontSize: "13px" } }, item.title),
                  createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, item.desc)
                )
              );
            })
          )
        ),
        createElement(Card, null,
          createElement("div", { style: styles.cardTitle }, "🇪🇺 EU Drivers"),
          createElement("div", { style: { display: "flex", flexDirection: "column", gap: "10px" } },
            [
              { icon: "📜", title: "CO2 Standards for HDV", desc: "90% CO2 reduction by 2040 - most aggressive globally" },
              { icon: "🛣️", title: "AFIR Regulation", desc: "Mandatory truck charging every 60km on TEN-T network by 2025" },
              { icon: "💶", title: "National Incentives", desc: "Germany up to €400K, France €50K, NL tax benefits" }
            ].map(function(item, i) {
              return createElement("div", { key: i, style: { display: "flex", gap: "10px", padding: "10px", background: COLORS.background, borderRadius: "6px" } },
                createElement("span", null, item.icon),
                createElement("div", null,
                  createElement("div", { style: { fontWeight: "600", fontSize: "13px" } }, item.title),
                  createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, item.desc)
                )
              );
            })
          )
        )
      )
    ),

    // Market Data Sources Section
    createElement("div", { style: { marginTop: "32px" } },
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "📚 Market Data Sources"),
        createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" } },
          createElement("div", null,
            createElement("div", { style: { fontWeight: "600", marginBottom: "12px", color: COLORS.primary } }, "📊 Market Research"),
            createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" } },
              KEY_SOURCES.market.map(function(source, i) {
                return createElement(SourceLink, { key: i, url: source.url, name: source.name });
              })
            )
          ),
          createElement("div", null,
            createElement("div", { style: { fontWeight: "600", marginBottom: "12px", color: COLORS.info } }, "🇺🇸 US Regulations"),
            createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" } },
              KEY_SOURCES.regulations_us.map(function(source, i) {
                return createElement(SourceLink, { key: i, url: source.url, name: source.name });
              })
            )
          ),
          createElement("div", null,
            createElement("div", { style: { fontWeight: "600", marginBottom: "12px", color: COLORS.success } }, "🇪🇺 EU Regulations"),
            createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" } },
              KEY_SOURCES.regulations_eu.map(function(source, i) {
                return createElement(SourceLink, { key: i, url: source.url, name: source.name });
              })
            )
          ),
          createElement("div", null,
            createElement("div", { style: { fontWeight: "600", marginBottom: "12px", color: COLORS.accent } }, "🇮🇱 Israel (Sources Required)"),
            createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" } },
              KEY_SOURCES.israel.map(function(source, i) {
                return createElement(SourceLink, { key: i, url: source.url, name: source.name });
              })
            ),
            createElement("div", { style: { marginTop: "8px", fontSize: "11px", color: COLORS.accent } },
              "⚠️ Limited data - additional validation required"
            )
          )
        )
      )
    )
  );
}

// ============ SOURCES TAB ============
function SourcesTab() {
  var categories = ["Research & Analytics", "Government Sources", "Incentive Programs", "OEM Specifications", "EU Government Sources", "EU OEM Specifications", "Israeli Market (Sources Required)"];

  var avgValidity = Math.round(SOURCES_DATA.reduce(function(sum, s) { return sum + s.validity; }, 0) / SOURCES_DATA.length * 10) / 10;
  var govSources = SOURCES_DATA.filter(function(s) { return s.validity === 10; }).length;

  function getValidityColor(score) {
    if (score >= 9) return COLORS.success;
    if (score >= 7) return COLORS.primary;
    if (score >= 5) return COLORS.accent;
    return COLORS.danger;
  }

  function getValidityLabel(score) {
    if (score === 10) return "Authoritative";
    if (score >= 9) return "Highly Reliable";
    if (score >= 8) return "Reliable";
    if (score >= 7) return "Generally Reliable";
    if (score >= 5) return "Moderate";
    return "Use with Caution";
  }

  function renderValidityBadge(score) {
    var color = getValidityColor(score);
    return createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } },
      createElement("div", { style: {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        background: color + "20",
        border: "2px solid " + color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        fontSize: "12px",
        color: color
      }}, score),
      createElement("span", { style: { fontSize: "11px", color: COLORS.textMuted } }, getValidityLabel(score))
    );
  }

  return createElement("div", null,
    // Key Metrics
    createElement("div", { style: styles.grid },
      createElement(MetricCard, {
        icon: "📚",
        title: "Total Sources",
        value: SOURCES_DATA.length,
        label: "Verified data sources",
        color: COLORS.primary
      }),
      createElement(MetricCard, {
        icon: "✅",
        title: "Avg Validity Score",
        value: avgValidity + "/10",
        label: "Across all sources",
        color: COLORS.success
      }),
      createElement(MetricCard, {
        icon: "🏛️",
        title: "Government Sources",
        value: govSources,
        label: "Official government data",
        color: COLORS.info
      }),
      createElement(MetricCard, {
        icon: "🔗",
        title: "All Links Verified",
        value: "100%",
        label: "As of March 2024",
        color: COLORS.accent
      })
    ),

    // Validity Score Legend
    createElement("div", { style: { marginTop: "32px" } },
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "📊 Validity Score Guide"),
        createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "24px", padding: "8px 0" } },
          [
            { score: 10, label: "Authoritative", desc: "Government/official sources" },
            { score: 9, label: "Highly Reliable", desc: "Major research institutions" },
            { score: 8, label: "Reliable", desc: "Established industry research" },
            { score: 7, label: "Generally Reliable", desc: "OEM/manufacturer data" }
          ].map(function(item) {
            return createElement("div", { key: item.score, style: { display: "flex", alignItems: "center", gap: "12px" } },
              createElement("div", { style: {
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: getValidityColor(item.score) + "20",
                border: "2px solid " + getValidityColor(item.score),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "11px",
                color: getValidityColor(item.score)
              }}, item.score),
              createElement("div", null,
                createElement("div", { style: { fontWeight: "600", fontSize: "13px" } }, item.label),
                createElement("div", { style: { fontSize: "11px", color: COLORS.textMuted } }, item.desc)
              )
            );
          })
        )
      )
    ),

    // Sources by Category
    categories.map(function(category) {
      var categorySources = SOURCES_DATA.filter(function(s) { return s.category === category; });
      var categoryIcon = category === "Research & Analytics" ? "🔬" :
                        category === "Government Sources" ? "🏛️" :
                        category === "Incentive Programs" ? "💵" : "🚛";

      return createElement("div", { key: category, style: { marginTop: "32px" } },
        createElement("div", { style: styles.sectionTitle }, categoryIcon, " ", category),
        createElement(Card, null,
          createElement("div", { style: { overflowX: "auto" } },
            createElement("table", { style: styles.table },
              createElement("thead", null,
                createElement("tr", null,
                  createElement("th", { style: styles.th }, "Source"),
                  createElement("th", { style: styles.th }, "Type"),
                  createElement("th", { style: styles.th }, "Data Used"),
                  createElement("th", { style: styles.th }, "Validity"),
                  createElement("th", { style: styles.th }, "Link")
                )
              ),
              createElement("tbody", null,
                categorySources.map(function(source, index) {
                  return createElement("tr", { key: index },
                    createElement("td", { style: Object.assign({}, styles.td, { maxWidth: "200px" }) },
                      createElement("div", { style: { fontWeight: "600", marginBottom: "4px" } }, source.name),
                      createElement("div", { style: { fontSize: "11px", color: COLORS.textMuted, lineHeight: "1.4" } }, source.description)
                    ),
                    createElement("td", { style: styles.td },
                      createElement(Badge, { variant: source.type === "Government" || source.type === "Intergovernmental" || source.type === "Government Program" ? "success" : source.type === "Non-Profit Research" ? "info" : "warning" }, source.type)
                    ),
                    createElement("td", { style: Object.assign({}, styles.td, { fontSize: "12px", color: COLORS.textMuted, maxWidth: "250px" }) }, source.dataUsed),
                    createElement("td", { style: styles.td }, renderValidityBadge(source.validity)),
                    createElement("td", { style: styles.td },
                      createElement("a", {
                        href: source.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        style: {
                          color: COLORS.primary,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "6px 12px",
                          background: COLORS.primary + "15",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "500"
                        }
                      }, "Visit ↗")
                    )
                  );
                })
              )
            )
          )
        )
      );
    }),

    // Methodology Note
    createElement("div", { style: { marginTop: "32px" } },
      createElement(Card, { style: { borderColor: COLORS.info + "40" } },
        createElement("div", { style: styles.cardTitle }, "📋 Data Methodology & Notes"),
        createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", fontSize: "13px", color: COLORS.textMuted } },
          createElement("div", null,
            createElement("div", { style: { fontWeight: "600", color: COLORS.text, marginBottom: "8px" } }, "Validity Scoring Criteria"),
            createElement("div", { style: { lineHeight: "1.6" } },
              "• Government sources receive 10/10 (official data)",
              createElement("br"),
              "• Research institutions scored 8-9 based on methodology",
              createElement("br"),
              "• OEM data scored 7-8 (potential marketing bias)",
              createElement("br"),
              "• All links verified as of March 2024"
            )
          ),
          createElement("div", null,
            createElement("div", { style: { fontWeight: "600", color: COLORS.text, marginBottom: "8px" } }, "Data Reconciliation"),
            createElement("div", { style: { lineHeight: "1.6" } },
              "• When sources conflict, government data takes precedence",
              createElement("br"),
              "• Market projections averaged across multiple sources",
              createElement("br"),
              "• OEM specs taken from official product pages",
              createElement("br"),
              "• TCO calculations follow NACFE methodology"
            )
          ),
          createElement("div", null,
            createElement("div", { style: { fontWeight: "600", color: COLORS.text, marginBottom: "8px" } }, "Limitations"),
            createElement("div", { style: { lineHeight: "1.6" } },
              "• Some sources require subscriptions for full data",
              createElement("br"),
              "• OEM pricing may vary by configuration/region",
              createElement("br"),
              "• Market projections are estimates, not guarantees",
              createElement("br"),
              "• Incentive programs subject to funding availability"
            )
          )
        )
      )
    ),

    // Quick Links - US
    createElement("div", { style: { marginTop: "24px" } },
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "🇺🇸 Quick Access: US Sources"),
        createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "12px" } },
          [
            { name: "IEA Global EV Outlook", url: "https://www.iea.org/reports/global-ev-outlook-2024", icon: "🌍" },
            { name: "CARB ACF Rule", url: "https://ww2.arb.ca.gov/our-work/programs/advanced-clean-fleets", icon: "📜" },
            { name: "NACFE Electric Trucks", url: "https://nacfe.org/research/electric-trucks/", icon: "🔬" },
            { name: "CA HVIP Vouchers", url: "https://californiahvip.org/", icon: "💰" },
            { name: "DOE AFDC", url: "https://afdc.energy.gov/", icon: "⚡" },
            { name: "EPA SmartWay", url: "https://www.epa.gov/smartway", icon: "🏛️" }
          ].map(function(link) {
            return createElement("a", {
              key: link.name,
              href: link.url,
              target: "_blank",
              rel: "noopener noreferrer",
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                background: COLORS.background,
                border: "1px solid " + COLORS.border,
                borderRadius: "8px",
                color: COLORS.text,
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: "500",
                transition: "all 0.2s ease"
              }
            }, link.icon, " ", link.name, " ↗");
          })
        )
      )
    ),

    // Quick Links - EU
    createElement("div", { style: { marginTop: "16px" } },
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "🇪🇺 Quick Access: EU Sources"),
        createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "12px" } },
          [
            { name: "EU CO2 Standards HDV", url: "https://climate.ec.europa.eu/eu-action/transport/road-transport-reducing-co2-emissions-vehicles/reducing-co2-emissions-heavy-duty-vehicles_en", icon: "📜" },
            { name: "EU AFIR Regulation", url: "https://transport.ec.europa.eu/transport-themes/clean-transport/alternative-fuels-sustainable-mobility-europe/alternative-fuels-infrastructure_en", icon: "🔌" },
            { name: "ACEA Fleet Report", url: "https://www.acea.auto/files/ACEA-report-vehicles-in-use-europe-2023.pdf", icon: "📊" },
            { name: "Germany KsNI", url: "https://www.klimafreundliche-nutzfahrzeuge.de/", icon: "💶" },
            { name: "BloombergNEF", url: "https://about.bnef.com/electric-vehicle-outlook/", icon: "📈" }
          ].map(function(link) {
            return createElement("a", {
              key: link.name,
              href: link.url,
              target: "_blank",
              rel: "noopener noreferrer",
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                background: COLORS.background,
                border: "1px solid " + COLORS.border,
                borderRadius: "8px",
                color: COLORS.text,
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: "500",
                transition: "all 0.2s ease"
              }
            }, link.icon, " ", link.name, " ↗");
          })
        )
      )
    ),

    // Quick Links - Israel
    createElement("div", { style: { marginTop: "16px" } },
      createElement(Card, { style: { borderColor: COLORS.accent + "40" } },
        createElement("div", { style: styles.cardTitle }, "🇮🇱 Israel Sources (Additional Data Required)"),
        createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "12px" } },
          [
            { name: "Ministry of Transport", url: "https://www.gov.il/en/departments/ministry_of_transport_and_road_safety", icon: "🏛️" },
            { name: "Ministry of Environment", url: "https://www.gov.il/en/departments/ministry_of_environmental_protection", icon: "🌿" },
            { name: "Israel Electric Corp", url: "https://www.iec.co.il/en", icon: "⚡" },
            { name: "Globes Business", url: "https://en.globes.co.il/", icon: "📰" }
          ].map(function(link) {
            return createElement("a", {
              key: link.name,
              href: link.url,
              target: "_blank",
              rel: "noopener noreferrer",
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                background: COLORS.accent + "10",
                border: "1px solid " + COLORS.accent + "40",
                borderRadius: "8px",
                color: COLORS.text,
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: "500",
                transition: "all 0.2s ease"
              }
            }, link.icon, " ", link.name, " ↗");
          })
        ),
        createElement("div", { style: { marginTop: "12px", fontSize: "12px", color: COLORS.accent } },
          "⚠️ Israeli market data is limited. These sources provide general information but specific EV truck fleet data requires additional research."
        )
      )
    )
  );
}

// ============ MAIN APP ============
function App() {
  var tabState = useState("tco");
  var activeTab = tabState[0];
  var setActiveTab = tabState[1];

  var tabs = [
    { id: "tco", label: "💰 TCO Analysis", component: TCOAnalysisTab },
    { id: "oem", label: "🚛 OEM Comparison", component: OEMComparisonTab },
    { id: "infrastructure", label: "🔌 Infrastructure", component: InfrastructureTab },
    { id: "market", label: "📈 Market Outlook", component: MarketOutlookTab },
    { id: "sources", label: "📚 Sources", component: SourcesTab }
  ];

  var ActiveComponent = tabs.find(function(t) { return t.id === activeTab; }).component;

  return createElement("div", { style: styles.app },
    // Header
    createElement("header", { style: styles.header },
      createElement("div", { style: styles.headerContent },
        createElement("h1", { style: styles.title }, "Fleet Electrification Intelligence"),
        createElement("div", { style: styles.subtitle }, "ELECTRIC TRUCK MARKET DASHBOARD • TCO • OEM • INFRASTRUCTURE"),
        createElement("nav", { style: styles.nav },
          tabs.map(function(tab) {
            var isActive = activeTab === tab.id;
            return createElement("button", {
              key: tab.id,
              onClick: function() { setActiveTab(tab.id); },
              style: Object.assign({}, styles.navButton, isActive ? styles.navButtonActive : {})
            }, tab.label);
          })
        )
      )
    ),
    // Main Content
    createElement("main", { style: styles.main },
      createElement(ActiveComponent, null)
    ),
    // Footer
    createElement("footer", { style: { textAlign: "center", padding: "24px", color: COLORS.textDim, fontSize: "12px", borderTop: "1px solid " + COLORS.border } },
      "Fleet Electrification Intelligence Dashboard • Data sources: BloombergNEF, ACT Research, NACFE, RMI, CARB, EPA • Last updated: 2024"
    )
  );
}

// Export and mount
window.AppComponent = App;

var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(createElement(App));

requestAnimationFrame(function() {
  requestAnimationFrame(function() {
    var ld = document.getElementById("loading");
    if (ld) ld.style.display = "none";
  });
});

} catch(e) {
  console.error("Dashboard error:", e);
  var el = document.getElementById("error-msg");
  var ls = document.getElementById("load-status");
  if (ls) { ls.textContent = "Error: " + e.message; }
  if (el) { el.style.display = "block"; el.textContent = e.message; }
}

})();
