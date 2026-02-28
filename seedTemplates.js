require('dotenv').config();
const mongoose = require('mongoose');
const Template = require('./models/Template'); 

const templates = [
    // ==========================================
    // 1. PARASITOLOGY
    // ==========================================
    {
        testCode: 'MP',
        testName: 'Malaria Parasite',
        category: 'Parasitology',
        price: 3000,
        schemaDefinition: [
            { fieldName: 'malariaResult', label: 'Malaria Parasite Result', inputType: 'select', options: ['Negative', 'Trophozoite of Plasmodium falciparum (+) seen', 'Trophozoite of Plasmodium falciparum (++) seen', 'Trophozoite of Plasmodium falciparum (+++) seen'] }
        ]
    },

    // ==========================================
    // 2. SEROLOGY & RAPID SCREENS
    // ==========================================
    {
        testCode: 'WIDAL',
        testName: 'Widal Reaction',
        category: 'Serology',
        price: 3000,
        schemaDefinition: [
            { fieldName: 'sTyphiO', label: 'S. typhi O', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
            { fieldName: 'sTyphiH', label: 'S. typhi H', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
            { fieldName: 'sParatyphiAO', label: 'S. paratyphi AO', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
            { fieldName: 'sParatyphiAH', label: 'S. paratyphi AH', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
            { fieldName: 'sParatyphiBO', label: 'S. paratyphi BO', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
            { fieldName: 'sParatyphiBH', label: 'S. paratyphi BH', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
            { fieldName: 'sParatyphiCO', label: 'S. paratyphi CO', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
            { fieldName: 'sParatyphiCH', label: 'S. paratyphi CH', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
            { fieldName: 'sTitre', label: 'S. Titre Impression', inputType: 'text' }
        ]
    },
    {
        testCode: 'MP-WIDAL',
        testName: 'MP / WIDAL Combo',
        category: 'Serology',
        price: 5000,
        schemaDefinition: [
            { fieldName: 'malaria', label: 'Malaria Result', inputType: 'text' },
            { fieldName: 'widal', label: 'Widal Impression', inputType: 'text' }
        ]
    },
    {
        testCode: 'HEP-B',
        testName: 'Hepatitis B Profile',
        category: 'Serology',
        price: 4500,
        schemaDefinition: [
            { fieldName: 'hbsag', label: 'HBSAg', inputType: 'select', options: ['Negative', 'Positive'] },
            { fieldName: 'hbsab', label: 'HBSAb', inputType: 'select', options: ['Negative', 'Positive'] },
            { fieldName: 'hbeag', label: 'HBeAg', inputType: 'select', options: ['Negative', 'Positive'] },
            { fieldName: 'hbeab', label: 'HBeAb', inputType: 'select', options: ['Negative', 'Positive'] },
            { fieldName: 'hbcab', label: 'HBcAb', inputType: 'select', options: ['Negative', 'Positive'] }
        ]
    },

    // ==========================================
    // 3. HAEMATOLOGY & COAGULATION
    // ==========================================
    {
        testCode: 'FBC-ADULT-M',
        testName: 'Full Blood Count (Adult Male)',
        category: 'Haematology',
        price: 5000,
        schemaDefinition: [
            { fieldName: 'pcv', label: 'PCV', inputType: 'number' },
            { fieldName: 'hb', label: 'Hb', inputType: 'number' },
            { fieldName: 'wbc', label: 'WBC', inputType: 'number' },
            { fieldName: 'neutrophil', label: 'Neutrophil', inputType: 'number' },
            { fieldName: 'lymphocyte', label: 'Lymphocyte', inputType: 'number' },
            { fieldName: 'monocyte', label: 'Monocyte', inputType: 'number' },
            { fieldName: 'eosinophil', label: 'Eosinophil', inputType: 'number' },
            { fieldName: 'basophil', label: 'Basophil', inputType: 'number' },
            { fieldName: 'platelet', label: 'Platelet', inputType: 'number' },
            { fieldName: 'rbc', label: 'RBC', inputType: 'number' },
            { fieldName: 'mchc', label: 'MCHC', inputType: 'number' },
            { fieldName: 'mch', label: 'MCH', inputType: 'number' },
            { fieldName: 'mcv', label: 'MCV', inputType: 'number' }
        ]
    },
    {
        testCode: 'FBC-ADULT-F',
        testName: 'Full Blood Count (Adult Female)',
        category: 'Haematology',
        price: 5000,
        schemaDefinition: [
            { fieldName: 'pcv', label: 'PCV', inputType: 'number' },
            { fieldName: 'hb', label: 'Hb', inputType: 'number' },
            { fieldName: 'wbc', label: 'WBC', inputType: 'number' },
            { fieldName: 'neutrophil', label: 'Neutrophil', inputType: 'number' },
            { fieldName: 'lymphocyte', label: 'Lymphocyte', inputType: 'number' },
            { fieldName: 'monocyte', label: 'Monocyte', inputType: 'number' },
            { fieldName: 'eosinophil', label: 'Eosinophil', inputType: 'number' },
            { fieldName: 'basophil', label: 'Basophil', inputType: 'number' },
            { fieldName: 'platelet', label: 'Platelet', inputType: 'number' },
            { fieldName: 'rbc', label: 'RBC', inputType: 'number' },
            { fieldName: 'mchc', label: 'MCHC', inputType: 'number' },
            { fieldName: 'mch', label: 'MCH', inputType: 'number' },
            { fieldName: 'mcv', label: 'MCV', inputType: 'number' }
        ]
    },
    {
        testCode: 'BG-GENO',
        testName: 'Blood Group & Genotype',
        category: 'Haematology',
        price: 8000,
        schemaDefinition: [
            { fieldName: 'bloodGroup', label: 'Blood Group', inputType: 'select', options: ['"O" Rh "D" Positive', '"O" Rh "D" Negative', '"A" Rh "D" Positive', '"A" Rh "D" Negative', '"B" Rh "D" Positive', '"B" Rh "D" Negative', '"AB" Rh "D" Positive', '"AB" Rh "D" Negative'] },
            { fieldName: 'genotype', label: 'Hb Genotype', inputType: 'select', options: ['AA', 'AS', 'SS', 'SC', 'AC'] }
        ]
    },
    {
        testCode: 'ESR',
        testName: 'Erythrocyte Sedimentation Rate (ESR)',
        category: 'Haematology',
        price: 4000,
        schemaDefinition: [
            { fieldName: 'esr', label: 'ESR', inputType: 'number', unit: 'mm/hr', referenceRange: '0 - 20' }
        ]
    },

    // ==========================================
    // 4. CHEMISTRY
    // ==========================================
    {
        testCode: 'LFT-EXT',
        testName: 'Liver Function Test (LFT)',
        category: 'Chemistry',
        price: 12000,
        schemaDefinition: [
            { fieldName: 'tBil', label: 'Total Bilirubin', inputType: 'number', unit: 'mg/dl', referenceRange: '0 - 1.0' },
            { fieldName: 'dBil', label: 'Direct Bilirubin', inputType: 'number', unit: 'mg/dl', referenceRange: '0 - 0.4' },
            { fieldName: 'ast', label: 'AST', inputType: 'number', unit: 'U/L', referenceRange: 'Up to 40' },
            { fieldName: 'alt', label: 'ALT', inputType: 'number', unit: 'U/L', referenceRange: 'Up to 40' },
            { fieldName: 'alp', label: 'ALP', inputType: 'number', unit: 'U/L', referenceRange: '20-270 (Male), 20-240 (Female)' }
        ]
    },
    {
        testCode: 'LIPID-EXT',
        testName: 'Full Lipid Profile',
        category: 'Chemistry',
        price: 12000,
        schemaDefinition: [
            { fieldName: 'cholesterol', label: 'Total Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '< 200 (Normal), 200-239 (Borderline), ≥ 240 (High)' },
            { fieldName: 'triglycerides', label: 'Triglycerides', inputType: 'number', unit: 'mg/dl', referenceRange: '< 150 (Normal), 150-199 (Borderline), 200-499 (High), > 500 (Very High)' },
            { fieldName: 'hdl', label: 'HDL Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '30 - 75' },
            { fieldName: 'ldl', label: 'LDL Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '66 - 178' },
            { fieldName: 'vldl', label: 'VLDL', inputType: 'number', unit: 'mg/dl', referenceRange: '2 - 30' } 
        ]
    },
    {
        testCode: 'RENAL-EXT',
        testName: 'Kidney Function Test (E/U/CR)',
        category: 'Chemistry',
        price: 13000,
        schemaDefinition: [
            { fieldName: 'na', label: 'Na+', inputType: 'number', unit: 'mmol/L', referenceRange: '135 - 145' },
            { fieldName: 'cl', label: 'Cl-', inputType: 'number', unit: 'mmol/L', referenceRange: '98 - 108' },
            { fieldName: 'k', label: 'K+', inputType: 'number', unit: 'mmol/L', referenceRange: '3.5 - 5.5' },
            { fieldName: 'hco3', label: 'HCO3-', inputType: 'number', unit: 'mmol/L', referenceRange: '21 - 28' },
            { fieldName: 'urea', label: 'Urea', inputType: 'number', unit: 'mg/dl', referenceRange: '10 - 55' },
            { fieldName: 'creatinine', label: 'Creatinine', inputType: 'number', unit: 'mg/dl', referenceRange: '0.6-1.3 (Male), 0.6-1.2 (Female)' },
            { fieldName: 'uricAcid', label: 'Uric Acid', inputType: 'number', unit: 'mg/dl', referenceRange: '2.0-5.0 (Child), 2.5-6.5 (Adult F), 3.5-7.5 (Adult M)' }
        ]
    },

    // ==========================================
    // 5. IMMUNOASSAY & SPECIALIZED TESTS
    // ==========================================
    {
        testCode: 'HORM-F',
        testName: 'Female Hormonal Profile',
        category: 'Immunoassay',
        price: 38000,
        schemaDefinition: [
            { fieldName: 'lh', label: 'LH', inputType: 'number', unit: 'mIU/ml', referenceRange: '2.1-12.7 (Follicular), 1.0-12.0 (Luteal)' },
            { fieldName: 'fsh', label: 'FSH', inputType: 'number', unit: 'mIU/ml', referenceRange: '2.9-12.0 (Follicular), 1.5-7.0 (Luteal)' },
            { fieldName: 'prolactin', label: 'Prolactin', inputType: 'number', unit: 'ng/ml', referenceRange: '5.0 - 35.0' },
            { fieldName: 'progesterone', label: 'Progesterone', inputType: 'number', unit: 'ng/ml', referenceRange: '0.2-1.4 (Follicular), 4-25 (Luteal)' },
            { fieldName: 'estradiol', label: 'Estradiol', inputType: 'number', unit: 'pg/ml', referenceRange: '10.1-177 (Follicular), 64.8-564 (Ovulation), 42-310 (Luteal)' }
        ]
    },
    {
        testCode: 'HORM-M',
        testName: 'Male Hormonal Profile',
        category: 'Immunoassay',
        price: 38000,
        schemaDefinition: [
            { fieldName: 'lh', label: 'LH', inputType: 'number', unit: 'mIU/ml', referenceRange: '1.5 - 9.6' },
            { fieldName: 'fsh', label: 'FSH', inputType: 'number', unit: 'mIU/ml', referenceRange: '1.7 - 12.0' },
            { fieldName: 'prolactin', label: 'Prolactin', inputType: 'number', unit: 'ng/ml', referenceRange: '3.0 - 25.0' },
            { fieldName: 'testosterone', label: 'Testosterone', inputType: 'number', unit: 'ng/ml', referenceRange: '2.0 - 12.0' }
        ]
    },
    {
        testCode: 'TFT',
        testName: 'Thyroid Function Test (T3, T4, TSH)',
        category: 'Immunoassay',
        price: 30000,
        schemaDefinition: [
            { fieldName: 't3', label: 'T3', inputType: 'number', unit: 'nmol/L', referenceRange: '1.23 - 3.08' },
            { fieldName: 't4', label: 'T4', inputType: 'number', unit: 'nmol/L', referenceRange: '57.9 - 150.6' },
            { fieldName: 'tsh', label: 'TSH', inputType: 'number', unit: 'uIU/ml', referenceRange: '0.4 - 5.6' }
        ]
    },

    // ==========================================
    // 6. MICROBIOLOGY & SWABS
    // ==========================================
    {
        testCode: 'URINALYSIS',
        testName: 'Urinalysis',
        category: 'Microbiology',
        price: 3000,
        schemaDefinition: [
            { fieldName: 'colour', label: 'Colour', inputType: 'text' },
            { fieldName: 'appearance', label: 'Appearance', inputType: 'text' },
            { fieldName: 'ph', label: 'PH', inputType: 'text' },
            { fieldName: 'specificGravity', label: 'Specific Gravity', inputType: 'text' },
            { fieldName: 'glucose', label: 'Glucose', inputType: 'select', options: ['Negative', '+', '++', '+++'] },
            { fieldName: 'protein', label: 'Protein', inputType: 'select', options: ['Negative', '+', '++', '+++'] },
            { fieldName: 'blood', label: 'Blood', inputType: 'select', options: ['Negative', '+', '++', '+++'] },
            { fieldName: 'leucocyte', label: 'Leucocyte', inputType: 'select', options: ['Negative', '+', '++', '+++'] },
            { fieldName: 'nitrite', label: 'Nitrite', inputType: 'select', options: ['Negative', 'Positive'] }
        ]
    },
    {
        testCode: 'URINE-MCS',
        testName: 'Urine M/C/S',
        category: 'Microbiology',
        price: 9500,
        schemaDefinition: [
            { fieldName: 'appearance', label: 'Appearance', inputType: 'text' },
            { fieldName: 'colour', label: 'Colour', inputType: 'text' },
            { fieldName: 'pusCells', label: 'Pus Cells', inputType: 'text' },
            { fieldName: 'epithelialCells', label: 'Epithelial Cells', inputType: 'text' },
            { fieldName: 'yeastCells', label: 'Yeast Cells', inputType: 'text' },
            { fieldName: 'culture', label: 'Culture Yield', inputType: 'text' },
            { fieldName: 'sensitivity', label: 'Sensitivities / Resistance', inputType: 'textarea' }
        ]
    },
    {
        testCode: 'SFA',
        testName: 'Seminal Fluid Analysis (SFA) Only',
        category: 'Microbiology',
        price: 5500,
        schemaDefinition: [
            { fieldName: 'volume', label: 'Volume', inputType: 'text' },
            { fieldName: 'consistency', label: 'Consistency', inputType: 'text' },
            { fieldName: 'liquefaction', label: 'Liquefaction', inputType: 'text' },
            { fieldName: 'ph', label: 'PH', inputType: 'text' },
            { fieldName: 'totalMotility', label: 'Total Motility (%)', inputType: 'text' },
            { fieldName: 'pusCells', label: 'Pus Cells', inputType: 'text' },
            { fieldName: 'spermConcentration', label: 'Sperm Concentration', inputType: 'text' },
            { fieldName: 'totalCount', label: 'Total Count', inputType: 'text' }
        ]
    },
    {
        testCode: 'SFA-MCS',
        testName: 'SFA + M/CS',
        category: 'Microbiology',
        price: 10000,
        schemaDefinition: [
            { fieldName: 'volume', label: 'Volume', inputType: 'text' },
            { fieldName: 'totalMotility', label: 'Total Motility (%)', inputType: 'text' },
            { fieldName: 'spermConcentration', label: 'Sperm Concentration', inputType: 'text' },
            { fieldName: 'culture', label: 'Culture Yield', inputType: 'text' },
            { fieldName: 'sensitivity', label: 'Sensitivities / Resistance', inputType: 'textarea' }
        ]
    }
];

// ==========================================
// 7. AUTO-GENERATOR FOR X-RAYS, SCANS, & INDIVIDUAL TESTS
// ==========================================
const autoGenerateTests = () => {
    // Basic Scans & Ultrasounds
    const scans = [
        { name: 'Pelvic Scan', price: 4000 }, { name: 'Obsts Scan', price: 4000 }, { name: 'Abdomen Pelvic Scan', price: 8000 },
        { name: 'Tracking X1', price: 7000 }, { name: 'Tracking X3', price: 15000 }, { name: 'Breast Scan', price: 12000 },
        { name: 'Rectal Scan', price: 12000 }, { name: 'Prostate Scan', price: 10000 }, { name: 'Scrotal Scan', price: 10000 },
        { name: 'Pregnancy Scan', price: 4000 }, { name: 'Thyroid Scan', price: 10000 }, { name: 'TVS', price: 7000 },
        { name: 'Thigh Scan', price: 9000 }, { name: 'ECG (Pre & Post)', price: 15000 }, { name: 'Echo Adult', price: 55000 },
        { name: 'Echo Children', price: 65000 }, { name: 'Coloured Doppler Thigh', price: 55000 }, { name: 'Coloured Doppler Both Thigh', price: 85000 }
    ];

    scans.forEach(scan => {
        templates.push({
            testCode: `IMG-${scan.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}`,
            testName: scan.name,
            category: 'Imaging',
            price: scan.price,
            schemaDefinition: [{ fieldName: 'imagingReport', label: 'Sonographer / Cardiologist Report', inputType: 'textarea' }]
        });
    });

    // X-Rays
    const xrays = [
        { name: 'Chest X-Ray', price: 9000 }, { name: 'Chest AP & Lat', price: 12000 }, { name: 'Shoulder Joint', price: 9000 },
        { name: 'Both Shoulder Joint', price: 17000 }, { name: 'Pelvic X-Ray', price: 11000 }, { name: 'Lumbo Sacral', price: 13000 },
        { name: 'Lumbo Sacral AP Lat Oblique', price: 13500 }, { name: 'Knee', price: 8000 }, { name: 'Both Knee', price: 15000 },
        { name: 'Elbow', price: 8000 }, { name: 'Both Elbow', price: 13000 }, { name: 'Skull', price: 10000 }, { name: 'Ankle', price: 8000 },
        { name: 'Both Ankle', price: 15000 }, { name: 'PNS / Sinuses', price: 10000 }, { name: 'Foot', price: 8000 }, { name: 'Both Foot', price: 15000 },
        { name: 'Mandible', price: 9500 }, { name: 'Femur', price: 8000 }, { name: 'Both Femur', price: 15000 }, { name: 'Plain Abdomen', price: 10000 },
        { name: 'Cervical Spine', price: 10000 }, { name: 'Tibia', price: 9000 }, { name: 'Pelvimetry', price: 35000 }, { name: 'Pelvic & Hip', price: 14000 },
        { name: 'Neck', price: 9500 }, { name: 'Wrist', price: 8000 }, { name: 'HSG', price: 40000 }
    ];

    xrays.forEach(xray => {
        templates.push({
            testCode: `XRAY-${xray.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}`,
            testName: xray.name,
            category: 'Imaging',
            price: xray.price,
            schemaDefinition: [{ fieldName: 'imagingReport', label: 'Radiologist Report', inputType: 'textarea' }]
        });
    });

    // Individual Simple Tests (Chemistry, Single Swabs, Serology)
    const simpleTests = [
        // Serology / Rapid
        { name: 'HIV Screening', price: 5000, cat: 'Serology' }, { name: 'VDRL', price: 7000, cat: 'Serology' },
        { name: 'Hepatitis A', price: 10000, cat: 'Serology' }, { name: 'Hepatitis C', price: 4500, cat: 'Serology' },
        { name: 'H. Pylori', price: 5000, cat: 'Serology' }, { name: 'Blood Pregnancy Test', price: 2000, cat: 'Serology' },
        { name: 'Rheumatoid Factor (RF)', price: 7000, cat: 'Serology' }, { name: 'Fecal Occult Blood (FOB)', price: 3000, cat: 'Serology' },
        
        // Chemistry & Single Markers
        { name: 'Alpha Feto Protein (AFP)', price: 19000, cat: 'Chemistry' }, { name: 'CRP', price: 13000, cat: 'Chemistry' },
        { name: 'Beta HCG', price: 10500, cat: 'Chemistry' }, { name: 'Fasting Blood Sugar', price: 2000, cat: 'Chemistry' },
        { name: 'Fasting Blood Sugar & 2HPP', price: 3500, cat: 'Chemistry' }, { name: 'Random Blood Sugar', price: 2000, cat: 'Chemistry' },
        { name: 'Cholesterol', price: 6000, cat: 'Chemistry' }, { name: 'Triglycerides', price: 6500, cat: 'Chemistry' },
        { name: 'HbA1c', price: 15000, cat: 'Chemistry' }, { name: 'Sodium', price: 4000, cat: 'Chemistry' }, 
        { name: 'Potassium (K+)', price: 5000, cat: 'Chemistry' }, { name: 'Creatinine', price: 6000, cat: 'Chemistry' },
        { name: 'Urea', price: 5000, cat: 'Chemistry' }, { name: 'Bilirubin', price: 5000, cat: 'Chemistry' },
        
        // Microbiology Swabs & Others
        { name: 'HVS M/CS', price: 9500, cat: 'Microbiology' }, { name: 'Urethral Swab M/CS', price: 9500, cat: 'Microbiology' },
        { name: 'Ear Swab M/CS', price: 9500, cat: 'Microbiology' }, { name: 'Wound Swab M/CS', price: 9500, cat: 'Microbiology' },
        { name: 'Cervical Swab M/CS', price: 9500, cat: 'Microbiology' }, { name: 'Stool M/CS', price: 9500, cat: 'Microbiology' },
        { name: 'Sputum M/CS', price: 9000, cat: 'Microbiology' }, { name: 'Sputum AFB X1', price: 5500, cat: 'Microbiology' },
        { name: 'Sputum AFB X3', price: 14500, cat: 'Microbiology' }, { name: 'Skin Scraping', price: 6000, cat: 'Microbiology' },
        { name: 'Mantoux', price: 4500, cat: 'Microbiology' }, { name: 'Pap Smear', price: 20000, cat: 'Microbiology' },
        
        // Tumors / Histopathology
        { name: 'Histopathology', price: 35000, cat: 'Microbiology' }, { name: 'CA 125', price: 45000, cat: 'Immunoassay' },
        { name: 'CA 15.3', price: 45000, cat: 'Immunoassay' }, { name: 'CEA', price: 30000, cat: 'Immunoassay' },
        { name: 'Toxo IgG & IgM', price: 32000, cat: 'Immunoassay' }, { name: 'PSA', price: 15000, cat: 'Immunoassay' }
    ];

    simpleTests.forEach(test => {
        // We give them a single generic text field or textarea depending on the category
        const inputType = 'textarea';
        
        templates.push({
            testCode: `TST-${test.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}`,
            testName: test.name,
            category: test.cat,
            price: test.price,
            schemaDefinition: [{ fieldName: 'result', label: 'Test Result / Impression', inputType: inputType }]
        });
    });
};

// Run the generator to populate the array
autoGenerateTests();

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        await Template.deleteMany();
        await Template.insertMany(templates);
        console.log(`✅ Successfully seeded ${templates.length} Dynamic Templates with Pricing into the database!`);

        process.exit();
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();