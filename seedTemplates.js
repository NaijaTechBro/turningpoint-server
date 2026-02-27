// require('dotenv').config();
// const mongoose = require('mongoose');
// const Template = require('./models/Template'); 

// const templates = [
//     {
//         testCode: 'MP',
//         testName: 'Malaria Parasite',
//         category: 'Parasitology',
//         schemaDefinition: [
//             {
//                 fieldName: 'malariaResult',
//                 label: 'Malaria Parasite Result',
//                 inputType: 'select',
//                 options: [
//                     'Negative', 
//                     'Trophozoite of Plasmodium falciparum (+) seen',
//                     'Trophozoite of Plasmodium falciparum (++) seen',
//                     'Trophozoite of Plasmodium falciparum (+++) seen'
//                 ],
//                 referenceRange: 'Negative'
//             }
//         ]
//     },

//     // 2. WIDAL REACTION (Grid/Number Inputs)
//     {
//         testCode: 'WIDAL',
//         testName: 'Widal Reaction',
//         category: 'Serology',
//         schemaDefinition: [
//             { fieldName: 'sTyphiO', label: 'S. typhi O', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
//             { fieldName: 'sTyphiH', label: 'S. typhi H', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
//             { fieldName: 'sParatyphiAO', label: 'S. paratyphi AO', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
//             { fieldName: 'sParatyphiAH', label: 'S. paratyphi AH', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
//             { fieldName: 'sParatyphiBO', label: 'S. paratyphi BO', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
//             { fieldName: 'sParatyphiBH', label: 'S. paratyphi BH', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
//             { fieldName: 'sParatyphiCO', label: 'S. paratyphi CO', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
//             { fieldName: 'sParatyphiCH', label: 'S. paratyphi CH', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
//             { fieldName: 'sTitre', label: 'S. Titre Impression', inputType: 'text', referenceRange: '≥1:80 Significant' }
//         ]
//     },

//     // 3. LIPID PROFILE (Quantitative Numbers)
//     {
//         testCode: 'LIPID',
//         testName: 'Lipid Profile',
//         category: 'Chemical Pathology',
//         schemaDefinition: [
//             { fieldName: 'cholesterol', label: 'Total Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '< 200 (Normal), 200-239 (Borderline), ≥ 240 (High)' },
//             { fieldName: 'triglycerides', label: 'Triglycerides', inputType: 'number', unit: 'mg/dl', referenceRange: '< 150 (Normal), 150-199 (Borderline), 200-499 (High), > 500 (Very High)' },
//             { fieldName: 'hdl', label: 'HDL Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '30 - 75' },
//             { fieldName: 'ldl', label: 'LDL Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '66 - 178' }
//         ]
//     }
// ];

// const seedDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log('✅ Connected to MongoDB');

//         // Clear existing templates to avoid duplicates during testing
//         await Template.deleteMany();
        
//         // Insert the new templates
//         await Template.insertMany(templates);
//         console.log('✅ Successfully seeded Dynamic Templates into the database!');

//         process.exit();
//     } catch (error) {
//         console.error('❌ Error seeding database:', error);
//         process.exit(1);
//     }
// };

// seedDB();


require('dotenv').config();
const mongoose = require('mongoose');
const Template = require('./models/Template'); 

const templates = [
    // --- 1. PARASITOLOGY ---
    {
        testCode: 'MP',
        testName: 'Malaria Parasite',
        category: 'Parasitology',
        schemaDefinition: [
            {
                fieldName: 'malariaResult',
                label: 'Malaria Parasite Result',
                inputType: 'select',
                options: [
                    'Negative', 
                    'Trophozoite of Plasmodium falciparum (+) seen',
                    'Trophozoite of Plasmodium falciparum (++) seen',
                    'Trophozoite of Plasmodium falciparum (+++) seen'
                ],
                referenceRange: 'Negative'
            }
        ]
    },

    // --- 2. SEROLOGY ---
    {
        testCode: 'WIDAL',
        testName: 'Widal Reaction',
        category: 'Serology',
        schemaDefinition: [
            { fieldName: 'sTyphiO', label: 'S. typhi O', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
            { fieldName: 'sTyphiH', label: 'S. typhi H', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
            { fieldName: 'sParatyphiAO', label: 'S. paratyphi AO', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
            { fieldName: 'sParatyphiAH', label: 'S. paratyphi AH', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
            { fieldName: 'sParatyphiBO', label: 'S. paratyphi BO', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
            { fieldName: 'sParatyphiBH', label: 'S. paratyphi BH', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
            { fieldName: 'sParatyphiCO', label: 'S. paratyphi CO', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
            { fieldName: 'sParatyphiCH', label: 'S. paratyphi CH', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
            { fieldName: 'sTitre', label: 'S. Titre Impression', inputType: 'text', referenceRange: '≥1:80 Significant' }
        ]
    },
    {
        testCode: 'HEP-B',
        testName: 'Hepatitis B Profile',
        category: 'Serology',
        schemaDefinition: [
            { fieldName: 'hbsag', label: 'HBSAg', inputType: 'select', options: ['Negative', 'Positive'] },
            { fieldName: 'hbsab', label: 'HBSAb', inputType: 'select', options: ['Negative', 'Positive'] },
            { fieldName: 'hbeag', label: 'HBeAg', inputType: 'select', options: ['Negative', 'Positive'] },
            { fieldName: 'hbeab', label: 'HBeAb', inputType: 'select', options: ['Negative', 'Positive'] },
            { fieldName: 'hbcab', label: 'HBcAb', inputType: 'select', options: ['Negative', 'Positive'] }
        ]
    },

    // --- 3. HAEMATOLOGY ---
    {
        testCode: 'FBC-ADULT',
        testName: 'Full Blood Count (Adult)',
        category: 'Haematology',
        schemaDefinition: [
            { fieldName: 'pcv', label: 'PCV', inputType: 'number', unit: '%', referenceRange: '34 - 50' },
            { fieldName: 'hb', label: 'Hb', inputType: 'number', unit: 'g/dl', referenceRange: '11.0 - 17.0' },
            { fieldName: 'wbc', label: 'WBC', inputType: 'number', unit: 'X 10^9/L', referenceRange: '4.0 - 10.0' },
            { fieldName: 'neutrophil', label: 'Neutrophil', inputType: 'number', unit: '%', referenceRange: '40 - 70' },
            { fieldName: 'lymphocyte', label: 'Lymphocyte', inputType: 'number', unit: '%', referenceRange: '20 - 50' },
            { fieldName: 'monocyte', label: 'Monocyte', inputType: 'number', unit: '%', referenceRange: '2 - 10' },
            { fieldName: 'eosinophil', label: 'Eosinophil', inputType: 'number', unit: '%', referenceRange: '1 - 8' },
            { fieldName: 'basophil', label: 'Basophil', inputType: 'number', unit: '%', referenceRange: '0 - 1' },
            { fieldName: 'platelet', label: 'Platelet', inputType: 'number', unit: 'X 10^9/L', referenceRange: '150 - 400' }
        ]
    },

    // --- 4. CHEMISTRY ---
    {
        testCode: 'LIPID',
        testName: 'Lipid Profile',
        category: 'Chemistry',
        schemaDefinition: [
            { fieldName: 'cholesterol', label: 'Total Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '< 200 (Normal), 200-239 (Borderline), ≥ 240 (High)' },
            { fieldName: 'triglycerides', label: 'Triglycerides', inputType: 'number', unit: 'mg/dl', referenceRange: '< 150 (Normal), 150-199 (Borderline), 200-499 (High), > 500 (Very High)' },
            { fieldName: 'hdl', label: 'HDL Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '30 - 75' },
            { fieldName: 'ldl', label: 'LDL Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '66 - 178' }
        ]
    },
    {
        testCode: 'LFT',
        testName: 'Liver Profile',
        category: 'Chemistry',
        schemaDefinition: [
            { fieldName: 'tBil', label: 'Total Bilirubin', inputType: 'number', unit: 'mg/dl', referenceRange: '0 - 1.0' },
            { fieldName: 'dBil', label: 'Direct Bilirubin', inputType: 'number', unit: 'mg/dl', referenceRange: '0 - 0.4' },
            { fieldName: 'ast', label: 'AST', inputType: 'number', unit: 'U/L', referenceRange: 'Up to 40' },
            { fieldName: 'alt', label: 'ALT', inputType: 'number', unit: 'U/L', referenceRange: 'Up to 40' },
            { fieldName: 'alp', label: 'ALP', inputType: 'number', unit: 'U/L', referenceRange: '20 - 270' }
        ]
    },
    {
        testCode: 'RENAL',
        testName: 'Renal Profile',
        category: 'Chemistry',
        schemaDefinition: [
            { fieldName: 'na', label: 'Na+', inputType: 'number', unit: 'mmol/L', referenceRange: '135 - 145' },
            { fieldName: 'cl', label: 'Cl-', inputType: 'number', unit: 'mmol/L', referenceRange: '98 - 108' },
            { fieldName: 'k', label: 'K+', inputType: 'number', unit: 'mmol/L', referenceRange: '3.5 - 5.5' },
            { fieldName: 'hco3', label: 'HCO3-', inputType: 'number', unit: 'mmol/L', referenceRange: '21 - 28' },
            { fieldName: 'urea', label: 'Urea', inputType: 'number', unit: 'mg/dl', referenceRange: '10 - 55' },
            { fieldName: 'creatinine', label: 'Creatinine', inputType: 'number', unit: 'mg/dl', referenceRange: '0.6 - 1.3' }
        ]
    },

    // --- 5. IMMUNOASSAY / HORMONAL ---
    {
        testCode: 'HORM-F',
        testName: 'Hormonal Profile (Female)',
        category: 'Immunoassay',
        schemaDefinition: [
            { fieldName: 'lh', label: 'LH', inputType: 'number', unit: 'mIU/ml', referenceRange: '2.1-12.7 (Follicular), 1.0-12.0 (Luteal)' },
            { fieldName: 'fsh', label: 'FSH', inputType: 'number', unit: 'mIU/ml', referenceRange: '2.9-12.0 (Follicular), 1.5-7.0 (Luteal)' },
            { fieldName: 'prolactin', label: 'Prolactin', inputType: 'number', unit: 'ng/ml', referenceRange: '5.0 - 35.0' },
            { fieldName: 'progesterone', label: 'Progesterone', inputType: 'number', unit: 'ng/ml', referenceRange: '0.2-1.4 (Follicular), 4-25 (Luteal)' },
            { fieldName: 'estradiol', label: 'Estradiol', inputType: 'number', unit: 'pg/ml', referenceRange: '10.1-177 (Follicular), 42-310 (Luteal)' }
        ]
    },

    // --- 6. MICROBIOLOGY ---
    {
        testCode: 'URINALYSIS',
        testName: 'Urinalysis',
        category: 'Microbiology',
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
        schemaDefinition: [
            { fieldName: 'pusCells', label: 'Pus Cells (/HPF)', inputType: 'text' },
            { fieldName: 'epithelialCells', label: 'Epithelial Cells (/HPF)', inputType: 'text' },
            { fieldName: 'yeastCells', label: 'Yeast Cells', inputType: 'text', referenceRange: 'Nil' },
            { fieldName: 'culture', label: 'Culture Yield', inputType: 'text' },
            { fieldName: 'sensitiveHigh', label: 'Sensitivity (+++)', inputType: 'text' },
            { fieldName: 'sensitiveMed', label: 'Sensitivity (++)', inputType: 'text' },
            { fieldName: 'sensitiveLow', label: 'Sensitivity (+)', inputType: 'text' },
            { fieldName: 'resistance', label: 'Resistance', inputType: 'text' }
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing templates to avoid duplicates during testing
        await Template.deleteMany();
        
        // Insert the new templates
        await Template.insertMany(templates);
        console.log('✅ Successfully seeded Dynamic Templates into the database!');

        process.exit();
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();