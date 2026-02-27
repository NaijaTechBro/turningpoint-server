require('dotenv').config();
const mongoose = require('mongoose');
const Template = require('./models/Template'); 

const templates = [
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

    // 2. WIDAL REACTION (Grid/Number Inputs)
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

    // 3. LIPID PROFILE (Quantitative Numbers)
    {
        testCode: 'LIPID',
        testName: 'Lipid Profile',
        category: 'Chemical Pathology',
        schemaDefinition: [
            { fieldName: 'cholesterol', label: 'Total Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '< 200 (Normal), 200-239 (Borderline), ≥ 240 (High)' },
            { fieldName: 'triglycerides', label: 'Triglycerides', inputType: 'number', unit: 'mg/dl', referenceRange: '< 150 (Normal), 150-199 (Borderline), 200-499 (High), > 500 (Very High)' },
            { fieldName: 'hdl', label: 'HDL Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '30 - 75' },
            { fieldName: 'ldl', label: 'LDL Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '66 - 178' }
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