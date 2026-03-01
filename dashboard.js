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
// Sources: ATA, ACEA, IEA Global EV Outlook 2025
var REGIONAL_MARKET_DATA = {
  us: {
    name: "United States",
    flag: "🇺🇸",
    totalTrucks: 3910000,  // ATA: 3.91M Class 8 trucks
    evShare2024: 0.6,      // IEA: ~1,700 EV trucks / 280K sales
    evShare2030: 13,       // IEA STEPS scenario
    evShare2035: 35,       // Conservative projection
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
    totalTrucks: 6400000,  // ACEA: 6.4M medium/heavy trucks
    evShare2024: 2.3,      // ACEA: 2.3% market share 2024
    evShare2030: 15,       // IEA projection
    evShare2035: 45,       // Based on EU CO2 targets
    regulations: [
      { name: "EU CO2 Standards HDV", year: 2025, description: "45% CO2 reduction by 2030, 90% by 2040" },
      { name: "Euro 7", year: 2027, description: "Strictest emission limits globally" },
      { name: "AFIR", year: 2025, description: "Mandatory truck charging every 60km on TEN-T" }
    ],
    keyMarkets: ["Germany", "France", "Netherlands", "Spain", "Italy"],
    avgIncentive: 120000,
    electricityPrice: 0.25,
    dieselPrice: 1.80
  }
};

// Electric truck sales projections (Sources: IEA Global EV Outlook 2025, ACEA, industry estimates)
// Note: 2024 figures are actual; 2025+ are projections based on IEA STEPS scenario
var REGIONAL_PROJECTIONS = [
  { year: 2024, us: 1700, eu: 10000 },    // IEA actual figures
  { year: 2025, us: 3000, eu: 15000 },    // ~75% growth (IEA trend)
  { year: 2026, us: 5500, eu: 23000 },
  { year: 2027, us: 9000, eu: 34000 },
  { year: 2028, us: 15000, eu: 48000 },
  { year: 2029, us: 24000, eu: 65000 },
  { year: 2030, us: 36000, eu: 85000 },   // ~13% penetration (IEA STEPS)
  { year: 2032, us: 60000, eu: 130000 },
  { year: 2035, us: 100000, eu: 200000 }  // Based on regulatory targets
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

// ============ DATA: Enhanced Geo Comparison ============
var GEO_COMPARISON_DATA = {
  na: {
    id: "na",
    name: "North America",
    flag: "🇺🇸",
    // Market Size (Sources: ATA, IEA Global EV Outlook 2025)
    totalFleet: 3910000,  // ATA: 3.91M Class 8 trucks in operation
    annualSales: 280000,  // Class 8 annual sales
    evUnits2024: 1700,    // IEA: ~1,700 electric trucks sold in US 2024
    evPenetration2024: 0.6,  // Calculated from sales data
    evPenetration2030: 13,   // IEA STEPS scenario: ~13% globally by 2030
    evPenetration2035: 35,   // Conservative projection
    cagr2024_2030: 78,
    // Economics
    avgTruckPrice: 180000,
    avgEvPremium: 150000,
    dieselPrice: 4.00,
    dieselUnit: "/gal",
    electricityPrice: 0.12,
    tcoBreakeven: 7,
    avgIncentive: 150000,
    totalIncentiveBudget: "8.5B",
    // Infrastructure
    publicChargersHD: 850,
    plannedChargers2030: 15000,
    chargingCorridors: "NEVI (53,000 mi)",
    gridReadiness: "Moderate",
    // OEM Landscape
    modelsAvailable: 8,
    localManufacturers: ["Tesla", "Freightliner", "Peterbilt", "Kenworth", "Nikola"],
    importedBrands: ["Volvo", "BYD", "Mercedes-Benz"],
    serviceNetwork: "Developing",
    // Key Barriers
    barriers: [
      { issue: "High upfront cost", severity: "High" },
      { issue: "Limited public charging", severity: "High" },
      { issue: "Range for long-haul", severity: "Medium" }
    ],
    // Key Drivers
    drivers: [
      { factor: "CA ACF + multi-state adoption", impact: "High" },
      { factor: "IRA incentives ($7,500-$40K)", impact: "High" },
      { factor: "Corporate sustainability goals", impact: "Medium" }
    ],
    // Top Use Cases
    useCases: ["Port drayage", "Regional distribution", "Last-mile delivery", "Yard trucks"],
    // Regulations Timeline
    regulationsTimeline: [
      { year: 2024, event: "CA ACF Rule begins phase-in" },
      { year: 2027, event: "EPA GHG Phase 3 standards" },
      { year: 2030, event: "CA: 50% ZEV truck sales required" },
      { year: 2035, event: "CA: 75% ZEV truck sales required" },
      { year: 2036, event: "CA: 100% ZEV truck sales required" }
    ]
  },
  eu: {
    id: "eu",
    name: "European Union",
    flag: "🇪🇺",
    // Market Size (Sources: ACEA, IEA Global EV Outlook 2025)
    totalFleet: 6400000,   // ACEA: 6.4M medium and heavy trucks on EU roads
    annualSales: 328000,   // ACEA: 327,896 new truck registrations in 2024
    evUnits2024: 10000,    // IEA: 10,000+ electric trucks sold in Europe 2024
    evPenetration2024: 2.3,  // ACEA: 2.3% market share in 2024
    evPenetration2030: 15,   // IEA projection with CO2 standards
    evPenetration2035: 45,   // Based on EU 65% CO2 reduction target
    cagr2024_2030: 75,
    // Economics
    avgTruckPrice: 120000,
    avgEvPremium: 200000,
    dieselPrice: 1.80,
    dieselUnit: "/L",
    electricityPrice: 0.25,
    tcoBreakeven: 6,
    avgIncentive: 120000,
    totalIncentiveBudget: "12B",
    // Infrastructure
    publicChargersHD: 1200,
    plannedChargers2030: 35000,
    chargingCorridors: "TEN-T (every 60km)",
    gridReadiness: "Strong",
    // OEM Landscape
    modelsAvailable: 12,
    localManufacturers: ["DAF", "MAN", "Scania", "IVECO", "Renault Trucks", "Volvo", "Mercedes-Benz"],
    importedBrands: ["Tesla", "BYD", "Nikola"],
    serviceNetwork: "Established",
    // Key Barriers
    barriers: [
      { issue: "High electricity prices", severity: "High" },
      { issue: "Vehicle cost premium", severity: "Medium" },
      { issue: "Cross-border charging standards", severity: "Medium" }
    ],
    // Key Drivers
    drivers: [
      { factor: "CO2 Standards (90% by 2040)", impact: "High" },
      { factor: "AFIR infrastructure mandate", impact: "High" },
      { factor: "City access restrictions", impact: "High" }
    ],
    // Top Use Cases
    useCases: ["Urban distribution", "Regional transport", "Supermarket logistics", "Construction"],
    // Regulations Timeline
    regulationsTimeline: [
      { year: 2025, event: "AFIR charging requirements begin" },
      { year: 2027, event: "Euro 7 emission standards" },
      { year: 2030, event: "45% CO2 reduction target" },
      { year: 2035, event: "65% CO2 reduction target" },
      { year: 2040, event: "90% CO2 reduction target" }
    ]
  }
};

// ============ DATA: Competitive Landscape ============
var MARKET_STACK_LAYERS = [
  {
    id: "autonomous",
    name: "Autonomous & Logistics",
    description: "Self-driving trucks and automated logistics networks",
    color: COLORS.purple,
    icon: "🤖",
    maturity: "Emerging",
    timeline: "2027+"
  },
  {
    id: "orchestration",
    name: "Fleet Orchestration",
    description: "End-to-end fleet management, routing, energy optimization, multi-depot coordination",
    color: COLORS.primary,
    icon: "🎯",
    maturity: "Growing",
    timeline: "NOW",
    isGreenbay: true
  },
  {
    id: "charging-software",
    name: "Charging Management",
    description: "Depot charge scheduling, load balancing, smart charging",
    color: COLORS.info,
    icon: "📊",
    maturity: "Established",
    timeline: "NOW"
  },
  {
    id: "charging-hardware",
    name: "Charging Hardware",
    description: "EVSE equipment, chargers, installation services",
    color: COLORS.accent,
    icon: "🔌",
    maturity: "Established",
    timeline: "NOW"
  },
  {
    id: "energy-storage",
    name: "Energy & Storage",
    description: "Battery storage, grid services, energy management",
    color: COLORS.success,
    icon: "🔋",
    maturity: "Growing",
    timeline: "NOW"
  }
];

var COMPETITORS_DATA = [
  // Autonomous Layer
  {
    name: "NexDash",
    layer: "autonomous",
    description: "Autonomous Zero-Emission Logistics Network",
    hq: "Israel",
    funding: "Series A",
    focus: ["Autonomous trucks", "Zero-emission logistics", "Network optimization"],
    website: "https://www.nexdash.com/",
    relevance: "Future convergence - AV fleets will need orchestration",
    threatLevel: "Low (different timeline)",
    partnerPotential: "High"
  },
  {
    name: "TuSimple",
    layer: "autonomous",
    description: "Autonomous trucking technology company",
    hq: "USA",
    funding: "Public (delisted)",
    focus: ["L4 autonomous trucks", "Freight network"],
    website: "https://www.tusimple.com/",
    relevance: "AV trucks will need fleet orchestration layer",
    threatLevel: "Low",
    partnerPotential: "Medium"
  },
  {
    name: "Aurora",
    layer: "autonomous",
    description: "Self-driving technology for trucking",
    hq: "USA",
    funding: "Public (AUR)",
    focus: ["Aurora Driver", "Trucking autonomy"],
    website: "https://aurora.tech/",
    relevance: "Major AV player - future orchestration need",
    threatLevel: "Low",
    partnerPotential: "Medium"
  },
  // Orchestration Layer (Greenbay's space)
  {
    name: "Greenbay",
    layer: "orchestration",
    description: "Fleet orchestration platform for electric and autonomous vehicles",
    hq: "Israel",
    funding: "Seed",
    focus: ["Fleet orchestration", "Energy optimization", "Multi-depot coordination", "AV-ready"],
    website: "#",
    isGreenbay: true,
    relevance: "Core positioning",
    threatLevel: "N/A",
    partnerPotential: "N/A"
  },
  {
    name: "Samsara",
    layer: "orchestration",
    description: "Fleet management and IoT platform",
    hq: "USA",
    funding: "Public (IOT)",
    focus: ["Telematics", "Fleet visibility", "Safety"],
    website: "https://www.samsara.com/",
    relevance: "Incumbent fleet management - less EV-focused",
    threatLevel: "Medium",
    partnerPotential: "Low"
  },
  {
    name: "Geotab",
    layer: "orchestration",
    description: "Fleet management and telematics",
    hq: "Canada",
    funding: "Private",
    focus: ["Telematics", "Data analytics", "EV assessment"],
    website: "https://www.geotab.com/",
    relevance: "Strong telematics, growing EV tools",
    threatLevel: "Medium",
    partnerPotential: "Medium"
  },
  {
    name: "Einride",
    layer: "orchestration",
    description: "Electric and autonomous freight",
    hq: "Sweden",
    funding: "Series C",
    focus: ["Electric trucks", "Autonomous pods", "Freight-as-a-Service"],
    website: "https://www.einride.tech/",
    relevance: "Vertical integration - trucks + software",
    threatLevel: "Medium-High",
    partnerPotential: "Low"
  },
  // Charging Management Layer
  {
    name: "Driivz",
    layer: "charging-software",
    description: "EV charging management platform",
    hq: "Israel",
    funding: "Acquired by Vontier",
    focus: ["Depot charging", "Fleet solutions", "Smart charging"],
    website: "https://www.driivz.com/",
    relevance: "Depot charging software - potential integration",
    threatLevel: "Low (complementary)",
    partnerPotential: "High"
  },
  {
    name: "ChargePoint",
    layer: "charging-software",
    description: "EV charging network and software",
    hq: "USA",
    funding: "Public (CHPT)",
    focus: ["Charging network", "Fleet solutions", "Software"],
    website: "https://www.chargepoint.com/",
    relevance: "Large network - fleet charging solutions",
    threatLevel: "Low (complementary)",
    partnerPotential: "High"
  },
  {
    name: "bp pulse / Omega)",
    layer: "charging-software",
    description: "Fleet charging solutions",
    hq: "UK",
    funding: "Corporate (bp)",
    focus: ["Fleet electrification", "Depot solutions", "Energy"],
    website: "https://www.bp.com/en/global/bp-pulse-fleet.html",
    relevance: "End-to-end fleet charging",
    threatLevel: "Low (complementary)",
    partnerPotential: "High"
  },
  // Charging Hardware Layer
  {
    name: "Delta Charge",
    layer: "charging-hardware",
    description: "EV charging infrastructure solutions",
    hq: "Taiwan/Global",
    funding: "Corporate (Delta Electronics)",
    focus: ["DC fast chargers", "Fleet charging", "Energy systems"],
    website: "https://www.delta-emea.com/ev-charging",
    relevance: "Hardware provider - integration opportunity",
    threatLevel: "None (different layer)",
    partnerPotential: "High"
  },
  {
    name: "ABB E-mobility",
    layer: "charging-hardware",
    description: "EV charging infrastructure",
    hq: "Switzerland",
    funding: "Corporate (ABB)",
    focus: ["DC chargers", "Fleet solutions", "Grid integration"],
    website: "https://new.abb.com/ev-charging",
    relevance: "Major hardware player",
    threatLevel: "None (different layer)",
    partnerPotential: "High"
  },
  {
    name: "Kempower",
    layer: "charging-hardware",
    description: "Modular EV charging solutions",
    hq: "Finland",
    funding: "Public (Helsinki)",
    focus: ["Modular chargers", "Fleet charging", "Scalable systems"],
    website: "https://kempower.com/",
    relevance: "Growing in fleet segment",
    threatLevel: "None (different layer)",
    partnerPotential: "High"
  },
  // Energy & Storage Layer
  {
    name: "Decade Energy",
    layer: "energy-storage",
    description: "Make electric your competitive advantage",
    hq: "USA",
    funding: "Venture-backed",
    focus: ["Battery storage", "Fleet energy", "Grid services"],
    website: "https://www.decade.energy/",
    relevance: "Energy layer - potential integration",
    threatLevel: "None (different layer)",
    partnerPotential: "High"
  },
  {
    name: "Tesla Megapack",
    layer: "energy-storage",
    description: "Utility-scale battery storage",
    hq: "USA",
    funding: "Corporate (Tesla)",
    focus: ["Grid storage", "Energy management"],
    website: "https://www.tesla.com/megapack",
    relevance: "Battery storage for depots",
    threatLevel: "None (different layer)",
    partnerPotential: "Medium"
  },
  {
    name: "Enel X",
    layer: "energy-storage",
    description: "Energy services and e-mobility",
    hq: "Italy",
    funding: "Corporate (Enel)",
    focus: ["Demand response", "Fleet charging", "Energy optimization"],
    website: "https://www.enelx.com/",
    relevance: "Energy services for fleets",
    threatLevel: "Low",
    partnerPotential: "High"
  }
];

var GREENBAY_POSITIONING = {
  tagline: "Fleet Orchestration for the Electric Era",
  uniqueValue: [
    { point: "End-to-end orchestration", desc: "Not just charging, not just routing - the full picture" },
    { point: "Energy-aware optimization", desc: "Routes + charging + grid costs in one system" },
    { point: "Multi-depot coordination", desc: "Scale across locations, not just single sites" },
    { point: "AV-ready architecture", desc: "Built for today's EVs, ready for tomorrow's autonomy" }
  ],
  vsCompetitors: [
    { vs: "vs Charging Software (Driivz)", advantage: "We optimize the fleet, they optimize the charger" },
    { vs: "vs Fleet Telematics (Samsara)", advantage: "We're EV-native, they're adding EV as a feature" },
    { vs: "vs Vertical Players (Einride)", advantage: "We're hardware-agnostic, work with any truck/charger" }
  ],
  partnerStrategy: [
    { layer: "Charging Hardware", partners: ["Delta Charge", "ABB", "Kempower"], value: "Hardware agnostic - integrate all" },
    { layer: "Charging Software", partners: ["Driivz", "ChargePoint"], value: "API integration for charge optimization" },
    { layer: "Energy/Storage", partners: ["Decade Energy", "Enel X"], value: "Grid services, demand response" },
    { layer: "Autonomous", partners: ["NexDash", "Aurora"], value: "Future: orchestrate AV fleets" }
  ],
  // Market opportunity (Sources: MarketsandMarkets, Fortune Business Insights, Mordor Intelligence)
  marketOpportunity: {
    tam: "70B",      // Global fleet management software market by 2030 (MarketsandMarkets)
    sam: "32B",      // HD trucking segment (T&L = 45% of market)
    som: "640M",     // EV fleet orchestration: ~2% of SAM, early adopter segment
    tamSource: "MarketsandMarkets Fleet Management Market Report 2025-2030",
    description: "Fleet orchestration software for electric commercial vehicles"
  }
};

// ============ DATA: Sources with Validity Scores ============
var SOURCES_DATA = [
  // Primary Market Data Sources
  {
    category: "Research & Analytics",
    name: "IEA Global EV Outlook 2025",
    url: "https://www.iea.org/reports/global-ev-outlook-2025",
    description: "International Energy Agency flagship report on global EV trends including heavy-duty vehicles",
    dataUsed: "EV truck sales (US: 1,700, EU: 10,000+ in 2024), market projections, TCO analysis",
    validity: 10,
    type: "International Agency",
    lastUpdated: "2025"
  },
  {
    category: "Research & Analytics",
    name: "ACEA Vehicles in Use Report",
    url: "https://www.acea.auto/files/ACEA-report-vehicles-in-use-europe-2023.pdf",
    description: "European Automobile Manufacturers' Association fleet statistics",
    dataUsed: "EU truck fleet size (6.4M), EV market share (2.3%), registration data",
    validity: 10,
    type: "Industry Association",
    lastUpdated: "2024"
  },
  {
    category: "Research & Analytics",
    name: "American Trucking Associations",
    url: "https://www.trucking.org/economics-and-industry-data",
    description: "Official US trucking industry statistics and economic data",
    dataUsed: "US Class 8 fleet size (3.91M), industry economics",
    validity: 10,
    type: "Industry Association",
    lastUpdated: "2024"
  },
  {
    category: "Research & Analytics",
    name: "MarketsandMarkets Fleet Management Report",
    url: "https://www.marketsandmarkets.com/Market-Reports/fleet-management-systems-market-1020.html",
    description: "Fleet management software market sizing and forecasts",
    dataUsed: "TAM projections ($70B by 2030), market segmentation",
    validity: 8,
    type: "Market Research",
    lastUpdated: "2025"
  },
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
  }
];

// ============ DATA: Market Projections ============
// US+EU combined market projections (Source: IEA Global EV Outlook 2025, ACEA)
// Total market = US (~280K) + EU (~328K) annual HD truck sales
var MARKET_PROJECTIONS = [
  { year: 2024, ev_sales: 11700, ev_share: 1.9, total_market: 608000 },   // IEA actuals
  { year: 2025, ev_sales: 18000, ev_share: 3.0, total_market: 610000 },
  { year: 2026, ev_sales: 28500, ev_share: 4.6, total_market: 615000 },
  { year: 2027, ev_sales: 43000, ev_share: 6.9, total_market: 620000 },
  { year: 2028, ev_sales: 63000, ev_share: 10.0, total_market: 625000 },
  { year: 2029, ev_sales: 89000, ev_share: 14.1, total_market: 630000 },
  { year: 2030, ev_sales: 121000, ev_share: 19.0, total_market: 635000 }, // IEA STEPS ~13% global
  { year: 2032, ev_sales: 190000, ev_share: 29.5, total_market: 645000 },
  { year: 2035, ev_sales: 300000, ev_share: 45.0, total_market: 665000 }  // Based on regulatory targets
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
    { name: "IEA Global EV Outlook 2025", url: "https://www.iea.org/reports/global-ev-outlook-2025" },
    { name: "ACEA Vehicles in Use", url: "https://www.acea.auto/files/ACEA-report-vehicles-in-use-europe-2023.pdf" },
    { name: "American Trucking Associations", url: "https://www.trucking.org/economics-and-industry-data" },
    { name: "MarketsandMarkets", url: "https://www.marketsandmarkets.com/Market-Reports/fleet-management-systems-market-1020.html" }
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

  return createElement("div", null,
    // Regional Overview Cards
    createElement("div", { style: styles.grid },
      createElement(MetricCard, {
        icon: "🇺🇸",
        title: "US 2030 EV Share",
        value: us.evShare2030 + "%",
        label: "~36K EV trucks/year (IEA STEPS)",
        color: COLORS.info
      }),
      createElement(MetricCard, {
        icon: "🇪🇺",
        title: "EU 2030 EV Share",
        value: eu.evShare2030 + "%",
        label: "~85K EV trucks/year (IEA STEPS)",
        color: COLORS.primary
      }),
      createElement(MetricCard, {
        icon: "🌍",
        title: "Combined 2035",
        value: "300K+",
        label: "Annual EV truck sales (US+EU)",
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
            createElement(Area, { type: "monotone", dataKey: "us", name: "🇺🇸 United States", fill: COLORS.info + "60", stroke: COLORS.info, strokeWidth: 2, stackId: "1" })
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
          )
        )
      )
    )
  );
}

// ============ GEO DEEP-DIVE TAB ============
function GeoDeepDiveTab() {
  var regions = [GEO_COMPARISON_DATA.na, GEO_COMPARISON_DATA.eu];

  function getSeverityColor(severity) {
    if (severity === "High") return COLORS.danger;
    if (severity === "Medium") return COLORS.accent;
    return COLORS.success;
  }

  function getImpactColor(impact) {
    if (impact === "High") return COLORS.success;
    if (impact === "Medium") return COLORS.primary;
    return COLORS.textMuted;
  }

  function ComparisonRow(props) {
    return createElement("tr", null,
      createElement("td", { style: Object.assign({}, styles.td, { fontWeight: "600", background: COLORS.background }) }, props.label),
      regions.map(function(region) {
        var value = props.getValue(region);
        var cellStyle = Object.assign({}, styles.td, { textAlign: "center" });
        if (props.highlight && props.highlight(region, value)) {
          cellStyle.color = COLORS.success;
          cellStyle.fontWeight = "600";
        }
        return createElement("td", { key: region.id, style: cellStyle }, value);
      })
    );
  }

  return createElement("div", null,
    // Side-by-Side Comparison Table
    createElement("div", { style: styles.section },
      createElement("div", { style: styles.sectionTitle }, "📊 Regional Comparison at a Glance"),
      createElement(Card, null,
        createElement("div", { style: { overflowX: "auto" } },
          createElement("table", { style: styles.table },
            createElement("thead", null,
              createElement("tr", null,
                createElement("th", { style: Object.assign({}, styles.th, { width: "200px" }) }, "Metric"),
                regions.map(function(region) {
                  return createElement("th", { key: region.id, style: Object.assign({}, styles.th, { textAlign: "center", minWidth: "150px" }) },
                    createElement("div", { style: { fontSize: "20px", marginBottom: "4px" } }, region.flag),
                    region.name
                  );
                })
              )
            ),
            createElement("tbody", null,
              // Market Size Section
              createElement("tr", null,
                createElement("td", { colSpan: 4, style: { padding: "12px 8px", background: COLORS.primary + "15", fontWeight: "600", color: COLORS.primary } }, "📈 Market Size")
              ),
              createElement(ComparisonRow, {
                label: "Total Fleet",
                getValue: function(r) { return formatNumber(r.totalFleet); }
              }),
              createElement(ComparisonRow, {
                label: "Annual Sales",
                getValue: function(r) { return formatNumber(r.annualSales); }
              }),
              createElement(ComparisonRow, {
                label: "EV Units (2024)",
                getValue: function(r) { return formatNumber(r.evUnits2024); }
              }),
              createElement(ComparisonRow, {
                label: "EV Penetration (2024)",
                getValue: function(r) { return r.evPenetration2024 + "%"; }
              }),
              createElement(ComparisonRow, {
                label: "EV Penetration (2030)",
                getValue: function(r) { return r.evPenetration2030 + "%"; },
                highlight: function(r, v) { return r.evPenetration2030 >= 30; }
              }),
              createElement(ComparisonRow, {
                label: "CAGR (2024-2030)",
                getValue: function(r) { return r.cagr2024_2030 + "%"; }
              }),

              // Economics Section
              createElement("tr", null,
                createElement("td", { colSpan: 4, style: { padding: "12px 8px", background: COLORS.accent + "15", fontWeight: "600", color: COLORS.accent } }, "💰 Economics")
              ),
              createElement(ComparisonRow, {
                label: "Diesel Price",
                getValue: function(r) { return "$" + r.dieselPrice.toFixed(2) + r.dieselUnit; }
              }),
              createElement(ComparisonRow, {
                label: "Electricity Price",
                getValue: function(r) { return "$" + r.electricityPrice.toFixed(2) + "/kWh"; }
              }),
              createElement(ComparisonRow, {
                label: "TCO Break-even",
                getValue: function(r) { return "Year " + r.tcoBreakeven; },
                highlight: function(r, v) { return r.tcoBreakeven <= 6; }
              }),
              createElement(ComparisonRow, {
                label: "Avg Incentive",
                getValue: function(r) { return "$" + formatNumber(r.avgIncentive); }
              }),
              createElement(ComparisonRow, {
                label: "Total Incentive Budget",
                getValue: function(r) { return "$" + r.totalIncentiveBudget; }
              }),

              // Infrastructure Section
              createElement("tr", null,
                createElement("td", { colSpan: 4, style: { padding: "12px 8px", background: COLORS.info + "15", fontWeight: "600", color: COLORS.info } }, "🔌 Infrastructure")
              ),
              createElement(ComparisonRow, {
                label: "HD Public Chargers",
                getValue: function(r) { return formatNumber(r.publicChargersHD); }
              }),
              createElement(ComparisonRow, {
                label: "Planned by 2030",
                getValue: function(r) { return formatNumber(r.plannedChargers2030); }
              }),
              createElement(ComparisonRow, {
                label: "Charging Corridors",
                getValue: function(r) { return r.chargingCorridors; }
              }),
              createElement(ComparisonRow, {
                label: "Grid Readiness",
                getValue: function(r) { return r.gridReadiness; }
              }),

              // OEM Landscape Section
              createElement("tr", null,
                createElement("td", { colSpan: 4, style: { padding: "12px 8px", background: COLORS.success + "15", fontWeight: "600", color: COLORS.success } }, "🚛 OEM Landscape")
              ),
              createElement(ComparisonRow, {
                label: "Models Available",
                getValue: function(r) { return r.modelsAvailable; },
                highlight: function(r, v) { return r.modelsAvailable >= 8; }
              }),
              createElement(ComparisonRow, {
                label: "Service Network",
                getValue: function(r) { return r.serviceNetwork; }
              })
            )
          )
        )
      )
    ),

    // Detailed Region Sections
    regions.map(function(region) {
      var borderColor = region.id === "na" ? COLORS.info : region.id === "eu" ? COLORS.primary : COLORS.accent;

      return createElement("div", { key: region.id, style: { marginTop: "48px" } },
        createElement("div", { style: Object.assign({}, styles.sectionTitle, { borderBottom: "3px solid " + borderColor, paddingBottom: "12px" }) },
          createElement("span", { style: { fontSize: "32px", marginRight: "12px" } }, region.flag),
          region.name + " Deep Dive"
        ),

        createElement("div", { style: styles.gridWide },
          // Key Metrics Card
          createElement(Card, null,
            createElement("div", { style: styles.cardTitle }, "📊 Key Metrics"),
            createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" } },
              [
                { label: "Total Fleet", value: formatNumber(region.totalFleet), color: COLORS.text },
                { label: "Annual Sales", value: formatNumber(region.annualSales), color: COLORS.text },
                { label: "EV Penetration 2024", value: region.evPenetration2024 + "%", color: COLORS.primary },
                { label: "EV Penetration 2030", value: region.evPenetration2030 + "%", color: COLORS.success },
                { label: "Models Available", value: region.modelsAvailable, color: COLORS.info },
                { label: "TCO Break-even", value: "Year " + region.tcoBreakeven, color: COLORS.accent }
              ].map(function(metric, i) {
                return createElement("div", { key: i, style: { padding: "12px", background: COLORS.background, borderRadius: "8px" } },
                  createElement("div", { style: { fontSize: "20px", fontWeight: "700", color: metric.color } }, metric.value),
                  createElement("div", { style: { fontSize: "11px", color: COLORS.textMuted } }, metric.label)
                );
              })
            )
          ),

          // Regulations Timeline Card
          createElement(Card, null,
            createElement("div", { style: styles.cardTitle }, "📜 Regulatory Timeline"),
            createElement("div", { style: { display: "flex", flexDirection: "column", gap: "8px" } },
              region.regulationsTimeline.map(function(item, i) {
                var isPast = item.year <= 2024;
                return createElement("div", { key: i, style: { display: "flex", gap: "12px", alignItems: "center" } },
                  createElement("div", { style: {
                    width: "50px",
                    padding: "4px 8px",
                    background: isPast ? COLORS.success + "20" : COLORS.info + "20",
                    color: isPast ? COLORS.success : COLORS.info,
                    borderRadius: "4px",
                    fontWeight: "600",
                    fontSize: "12px",
                    textAlign: "center"
                  }}, item.year),
                  createElement("div", { style: { fontSize: "13px", color: COLORS.text } }, item.event)
                );
              })
            )
          )
        ),

        createElement("div", { style: Object.assign({}, styles.gridWide, { marginTop: "24px" }) },
          // Drivers Card
          createElement(Card, null,
            createElement("div", { style: styles.cardTitle }, "🚀 Key Drivers"),
            createElement("div", { style: { display: "flex", flexDirection: "column", gap: "8px" } },
              region.drivers.map(function(driver, i) {
                return createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: COLORS.background, borderRadius: "6px" } },
                  createElement("span", { style: { fontSize: "13px" } }, driver.factor),
                  createElement("span", { style: {
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "11px",
                    fontWeight: "600",
                    background: getImpactColor(driver.impact) + "20",
                    color: getImpactColor(driver.impact)
                  }}, driver.impact + " Impact")
                );
              })
            )
          ),

          // Barriers Card
          createElement(Card, null,
            createElement("div", { style: styles.cardTitle }, "⚠️ Key Barriers"),
            createElement("div", { style: { display: "flex", flexDirection: "column", gap: "8px" } },
              region.barriers.map(function(barrier, i) {
                return createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: COLORS.background, borderRadius: "6px" } },
                  createElement("span", { style: { fontSize: "13px" } }, barrier.issue),
                  createElement("span", { style: {
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "11px",
                    fontWeight: "600",
                    background: getSeverityColor(barrier.severity) + "20",
                    color: getSeverityColor(barrier.severity)
                  }}, barrier.severity)
                );
              })
            )
          )
        ),

        createElement("div", { style: Object.assign({}, styles.gridWide, { marginTop: "24px" }) },
          // OEMs Card
          createElement(Card, null,
            createElement("div", { style: styles.cardTitle }, "🚛 OEM Landscape"),
            region.localManufacturers.length > 0 && createElement("div", { style: { marginBottom: "12px" } },
              createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted, marginBottom: "6px" } }, "Local/Regional Manufacturers:"),
              createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "6px" } },
                region.localManufacturers.map(function(oem, i) {
                  return createElement("span", { key: i, style: {
                    padding: "4px 10px",
                    background: COLORS.success + "15",
                    border: "1px solid " + COLORS.success + "40",
                    borderRadius: "4px",
                    fontSize: "12px",
                    color: COLORS.success
                  }}, oem);
                })
              )
            ),
            createElement("div", null,
              createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted, marginBottom: "6px" } }, "Imported Brands:"),
              createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "6px" } },
                region.importedBrands.map(function(oem, i) {
                  return createElement("span", { key: i, style: {
                    padding: "4px 10px",
                    background: COLORS.info + "15",
                    border: "1px solid " + COLORS.info + "40",
                    borderRadius: "4px",
                    fontSize: "12px",
                    color: COLORS.info
                  }}, oem);
                })
              )
            )
          ),

          // Use Cases Card
          createElement(Card, null,
            createElement("div", { style: styles.cardTitle }, "🎯 Top Use Cases"),
            createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" } },
              region.useCases.map(function(useCase, i) {
                return createElement("span", { key: i, style: {
                  padding: "8px 14px",
                  background: borderColor + "15",
                  border: "1px solid " + borderColor + "40",
                  borderRadius: "20px",
                  fontSize: "13px",
                  color: COLORS.text
                }}, useCase);
              })
            )
          )
        ),

        // Sources for this region
        createElement("div", { style: { marginTop: "24px" } },
          createElement(SourceCitation, {
            sources: region.id === "na" ? KEY_SOURCES.regulations_us.concat(KEY_SOURCES.market) :
                     KEY_SOURCES.regulations_eu.concat(KEY_SOURCES.market)
          })
        )
      );
    })
  );
}

// ============ COMPETITIVE LANDSCAPE TAB ============
function CompetitiveLandscapeTab() {
  function getThreatColor(level) {
    if (level === "None (different layer)" || level === "Low (complementary)" || level === "Low") return COLORS.success;
    if (level === "Medium" || level === "Low (different timeline)") return COLORS.accent;
    if (level === "Medium-High" || level === "High") return COLORS.danger;
    return COLORS.textMuted;
  }

  function getPartnerColor(potential) {
    if (potential === "High") return COLORS.success;
    if (potential === "Medium") return COLORS.accent;
    return COLORS.textMuted;
  }

  return createElement("div", null,
    // Greenbay Positioning Header
    createElement(Card, { style: { background: "linear-gradient(135deg, " + COLORS.primary + "20 0%, " + COLORS.card + " 100%)", borderColor: COLORS.primary, marginBottom: "32px" } },
      createElement("div", { style: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" } },
        createElement("div", { style: { fontSize: "48px" } }, "🎯"),
        createElement("div", null,
          createElement("div", { style: { fontSize: "24px", fontWeight: "700", color: COLORS.primary } }, "Greenbay"),
          createElement("div", { style: { fontSize: "16px", color: COLORS.text } }, GREENBAY_POSITIONING.tagline)
        )
      ),
      createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" } },
        GREENBAY_POSITIONING.uniqueValue.map(function(item, i) {
          return createElement("div", { key: i, style: { padding: "16px", background: COLORS.background, borderRadius: "8px", borderLeft: "3px solid " + COLORS.primary } },
            createElement("div", { style: { fontWeight: "600", marginBottom: "4px", color: COLORS.text } }, item.point),
            createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, item.desc)
          );
        })
      )
    ),

    // Market Stack Visualization
    createElement("div", { style: styles.section },
      createElement("div", { style: styles.sectionTitle }, "🏗️ Market Stack - Where Greenbay Fits"),
      createElement(Card, null,
        createElement("div", { style: { display: "flex", flexDirection: "column", gap: "4px" } },
          MARKET_STACK_LAYERS.map(function(layer) {
            var layerCompetitors = COMPETITORS_DATA.filter(function(c) { return c.layer === layer.id; });
            return createElement("div", { key: layer.id, style: {
              padding: "20px",
              background: layer.isGreenbay ? COLORS.primary + "20" : COLORS.background,
              borderRadius: "8px",
              border: layer.isGreenbay ? "2px solid " + COLORS.primary : "1px solid " + COLORS.border,
              position: "relative"
            }},
              createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" } },
                createElement("div", { style: { display: "flex", alignItems: "center", gap: "12px" } },
                  createElement("span", { style: { fontSize: "24px" } }, layer.icon),
                  createElement("div", null,
                    createElement("div", { style: { fontWeight: "700", fontSize: "16px", color: layer.color, display: "flex", alignItems: "center", gap: "8px" } },
                      layer.name,
                      layer.isGreenbay && createElement("span", { style: { padding: "2px 8px", background: COLORS.primary, color: "#000", borderRadius: "4px", fontSize: "10px", fontWeight: "700" } }, "GREENBAY")
                    ),
                    createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, layer.description)
                  )
                ),
                createElement("div", { style: { display: "flex", gap: "8px", alignItems: "center" } },
                  createElement("span", { style: { padding: "4px 10px", background: layer.color + "20", color: layer.color, borderRadius: "12px", fontSize: "11px", fontWeight: "600" } }, layer.maturity),
                  createElement("span", { style: { padding: "4px 10px", background: COLORS.card, borderRadius: "12px", fontSize: "11px", color: COLORS.textMuted } }, layer.timeline)
                )
              ),
              createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" } },
                layerCompetitors.map(function(comp) {
                  return createElement("span", { key: comp.name, style: {
                    padding: "6px 12px",
                    background: comp.isGreenbay ? COLORS.primary : COLORS.card,
                    color: comp.isGreenbay ? "#000" : COLORS.text,
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: comp.isGreenbay ? "700" : "500",
                    border: comp.isGreenbay ? "none" : "1px solid " + COLORS.border
                  }}, comp.name);
                })
              )
            );
          })
        )
      )
    ),

    // Competitive Positioning
    createElement("div", { style: { marginTop: "32px" } },
      createElement("div", { style: styles.sectionTitle }, "🏢 Competitive Positioning"),
      createElement("div", { style: styles.gridWide },
        GREENBAY_POSITIONING.vsCompetitors.map(function(item, i) {
          return createElement(Card, { key: i },
            createElement("div", { style: { fontWeight: "600", color: COLORS.accent, marginBottom: "8px", fontSize: "14px" } }, item.vs),
            createElement("div", { style: { fontSize: "15px", color: COLORS.text, lineHeight: "1.5" } }, item.advantage)
          );
        })
      )
    ),

    // Detailed Player Analysis
    createElement("div", { style: { marginTop: "32px" } },
      createElement("div", { style: styles.sectionTitle }, "🔍 Player Analysis by Layer"),
      MARKET_STACK_LAYERS.map(function(layer) {
        var layerCompetitors = COMPETITORS_DATA.filter(function(c) { return c.layer === layer.id && !c.isGreenbay; });
        if (layerCompetitors.length === 0) return null;

        return createElement("div", { key: layer.id, style: { marginTop: "24px" } },
          createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" } },
            createElement("span", { style: { fontSize: "20px" } }, layer.icon),
            createElement("span", { style: { fontWeight: "600", color: layer.color } }, layer.name)
          ),
          createElement(Card, null,
            createElement("div", { style: { overflowX: "auto" } },
              createElement("table", { style: styles.table },
                createElement("thead", null,
                  createElement("tr", null,
                    createElement("th", { style: styles.th }, "Company"),
                    createElement("th", { style: styles.th }, "Focus"),
                    createElement("th", { style: styles.th }, "HQ"),
                    createElement("th", { style: styles.th }, "Funding"),
                    createElement("th", { style: styles.th }, "Threat Level"),
                    createElement("th", { style: styles.th }, "Partner Potential"),
                    createElement("th", { style: styles.th }, "Link")
                  )
                ),
                createElement("tbody", null,
                  layerCompetitors.map(function(comp) {
                    return createElement("tr", { key: comp.name },
                      createElement("td", { style: Object.assign({}, styles.td, { fontWeight: "600" }) },
                        createElement("div", null, comp.name),
                        createElement("div", { style: { fontSize: "11px", color: COLORS.textMuted, fontWeight: "400" } }, comp.description)
                      ),
                      createElement("td", { style: Object.assign({}, styles.td, { fontSize: "12px" }) },
                        createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "4px" } },
                          comp.focus.slice(0, 2).map(function(f, i) {
                            return createElement("span", { key: i, style: { padding: "2px 6px", background: COLORS.background, borderRadius: "4px", fontSize: "10px" } }, f);
                          })
                        )
                      ),
                      createElement("td", { style: styles.td }, comp.hq),
                      createElement("td", { style: styles.td },
                        createElement("span", { style: { fontSize: "12px" } }, comp.funding)
                      ),
                      createElement("td", { style: styles.td },
                        createElement("span", { style: {
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: "600",
                          background: getThreatColor(comp.threatLevel) + "20",
                          color: getThreatColor(comp.threatLevel)
                        }}, comp.threatLevel)
                      ),
                      createElement("td", { style: styles.td },
                        createElement("span", { style: {
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: "600",
                          background: getPartnerColor(comp.partnerPotential) + "20",
                          color: getPartnerColor(comp.partnerPotential)
                        }}, comp.partnerPotential)
                      ),
                      createElement("td", { style: styles.td },
                        comp.website !== "#" && createElement("a", {
                          href: comp.website,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          style: {
                            color: COLORS.primary,
                            textDecoration: "none",
                            fontSize: "12px"
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
      })
    ),

    // Partnership Strategy
    createElement("div", { style: { marginTop: "32px" } },
      createElement("div", { style: styles.sectionTitle }, "🤝 Partnership Strategy"),
      createElement(Card, null,
        createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" } },
          GREENBAY_POSITIONING.partnerStrategy.map(function(item, i) {
            return createElement("div", { key: i, style: { padding: "16px", background: COLORS.background, borderRadius: "8px" } },
              createElement("div", { style: { fontWeight: "600", color: COLORS.primary, marginBottom: "8px" } }, item.layer),
              createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "8px" } },
                item.partners.map(function(p, j) {
                  return createElement("span", { key: j, style: { padding: "4px 8px", background: COLORS.success + "15", border: "1px solid " + COLORS.success + "40", borderRadius: "4px", fontSize: "11px", color: COLORS.success } }, p);
                })
              ),
              createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted } }, item.value)
            );
          })
        )
      )
    ),

    // TAM/SAM/SOM
    createElement("div", { style: { marginTop: "32px" } },
      createElement("div", { style: styles.sectionTitle }, "💰 Market Opportunity"),
      createElement(Card, null,
        createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", textAlign: "center" } },
          [
            { label: "TAM", value: "$" + GREENBAY_POSITIONING.marketOpportunity.tam, desc: "Total Addressable Market", color: COLORS.info },
            { label: "SAM", value: "$" + GREENBAY_POSITIONING.marketOpportunity.sam, desc: "Serviceable Addressable Market", color: COLORS.primary },
            { label: "SOM", value: "$" + GREENBAY_POSITIONING.marketOpportunity.som, desc: "Serviceable Obtainable Market", color: COLORS.success }
          ].map(function(item, i) {
            return createElement("div", { key: i, style: { padding: "24px", background: COLORS.background, borderRadius: "12px" } },
              createElement("div", { style: { fontSize: "14px", color: COLORS.textMuted, marginBottom: "8px" } }, item.label),
              createElement("div", { style: { fontSize: "36px", fontWeight: "700", color: item.color, fontFamily: "'DM Mono', monospace" } }, item.value),
              createElement("div", { style: { fontSize: "12px", color: COLORS.textMuted, marginTop: "4px" } }, item.desc)
            );
          })
        ),
        createElement("div", { style: { marginTop: "16px", textAlign: "center", fontSize: "13px", color: COLORS.textMuted } },
          GREENBAY_POSITIONING.marketOpportunity.description
        ),
        createElement("div", { style: { marginTop: "12px", textAlign: "center", fontSize: "11px", color: COLORS.textMuted, fontStyle: "italic" } },
          "TAM Source: MarketsandMarkets Fleet Management Market Report 2025-2030"
        )
      )
    ),

    // Key Insight Box
    createElement("div", { style: { marginTop: "32px" } },
      createElement(Card, { style: { background: COLORS.accent + "10", borderColor: COLORS.accent } },
        createElement("div", { style: { display: "flex", gap: "16px" } },
          createElement("span", { style: { fontSize: "32px" } }, "💡"),
          createElement("div", null,
            createElement("div", { style: { fontWeight: "700", color: COLORS.accent, marginBottom: "8px", fontSize: "16px" } }, "Key Insight for Investors"),
            createElement("div", { style: { fontSize: "14px", color: COLORS.text, lineHeight: "1.6" } },
              "Companies like Delta Charge, Decade Energy, and Driivz are ",
              createElement("strong", null, "infrastructure and hardware players"),
              ". They solve pieces of the puzzle. Greenbay sits at the ",
              createElement("strong", { style: { color: COLORS.primary } }, "orchestration layer"),
              " - the software brain that coordinates trucks, routes, charging, and energy across an entire fleet operation. As depots scale and fleets convert, the complexity explodes. That's where Greenbay's value compounds."
            )
          )
        )
      )
    )
  );
}

// ============ SOURCES TAB ============
function SourcesTab() {
  var categories = ["Research & Analytics", "Government Sources", "Incentive Programs", "OEM Specifications", "EU Government Sources", "EU OEM Specifications"];

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

    // Validity Score Legend (moved below sources)
    createElement("div", { style: { marginTop: "32px" } },
      createElement(Card, null,
        createElement("div", { style: styles.cardTitle }, "📊 Validity Score Guide"),
        createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "24px", padding: "8px 0" } },
          [
            { score: 10, label: "Authoritative", desc: "Government/official sources" },
            { score: 9, label: "Highly Reliable", desc: "Major research institutions" },
            { score: 8, label: "Reliable", desc: "Established industry research" },
            { score: 7, label: "Generally Reliable", desc: "OEM/manufacturer data" },
            { score: 6, label: "Limited Data", desc: "Sources requiring validation" }
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

    // Methodology Note
    createElement("div", { style: { marginTop: "24px" } },
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
    { id: "geo", label: "🌍 Geo Deep-Dive", component: GeoDeepDiveTab },
    { id: "competitive", label: "🏢 Competitive", component: CompetitiveLandscapeTab },
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
