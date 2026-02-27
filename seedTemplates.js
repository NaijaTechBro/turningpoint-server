// // require('dotenv').config();
// // const mongoose = require('mongoose');
// // const Template = require('./models/Template'); 

// // const templates = [
// //     {
// //         testCode: 'MP',
// //         testName: 'Malaria Parasite',
// //         category: 'Parasitology',
// //         schemaDefinition: [
// //             {
// //                 fieldName: 'malariaResult',
// //                 label: 'Malaria Parasite Result',
// //                 inputType: 'select',
// //                 options: [
// //                     'Negative', 
// //                     'Trophozoite of Plasmodium falciparum (+) seen',
// //                     'Trophozoite of Plasmodium falciparum (++) seen',
// //                     'Trophozoite of Plasmodium falciparum (+++) seen'
// //                 ],
// //                 referenceRange: 'Negative'
// //             }
// //         ]
// //     },

// //     // 2. WIDAL REACTION (Grid/Number Inputs)
// //     {
// //         testCode: 'WIDAL',
// //         testName: 'Widal Reaction',
// //         category: 'Serology',
// //         schemaDefinition: [
// //             { fieldName: 'sTyphiO', label: 'S. typhi O', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
// //             { fieldName: 'sTyphiH', label: 'S. typhi H', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
// //             { fieldName: 'sParatyphiAO', label: 'S. paratyphi AO', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
// //             { fieldName: 'sParatyphiAH', label: 'S. paratyphi AH', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
// //             { fieldName: 'sParatyphiBO', label: 'S. paratyphi BO', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
// //             { fieldName: 'sParatyphiBH', label: 'S. paratyphi BH', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
// //             { fieldName: 'sParatyphiCO', label: 'S. paratyphi CO', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
// //             { fieldName: 'sParatyphiCH', label: 'S. paratyphi CH', inputType: 'select', options: ['Negative', '1:20', '1:40', '1:80', '1:160', '1:320'] },
// //             { fieldName: 'sTitre', label: 'S. Titre Impression', inputType: 'text', referenceRange: '≥1:80 Significant' }
// //         ]
// //     },

// //     // 3. LIPID PROFILE (Quantitative Numbers)
// //     {
// //         testCode: 'LIPID',
// //         testName: 'Lipid Profile',
// //         category: 'Chemical Pathology',
// //         schemaDefinition: [
// //             { fieldName: 'cholesterol', label: 'Total Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '< 200 (Normal), 200-239 (Borderline), ≥ 240 (High)' },
// //             { fieldName: 'triglycerides', label: 'Triglycerides', inputType: 'number', unit: 'mg/dl', referenceRange: '< 150 (Normal), 150-199 (Borderline), 200-499 (High), > 500 (Very High)' },
// //             { fieldName: 'hdl', label: 'HDL Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '30 - 75' },
// //             { fieldName: 'ldl', label: 'LDL Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '66 - 178' }
// //         ]
// //     }
// // ];

// // const seedDB = async () => {
// //     try {
// //         await mongoose.connect(process.env.MONGO_URI);
// //         console.log('✅ Connected to MongoDB');

// //         // Clear existing templates to avoid duplicates during testing
// //         await Template.deleteMany();
        
// //         // Insert the new templates
// //         await Template.insertMany(templates);
// //         console.log('✅ Successfully seeded Dynamic Templates into the database!');

// //         process.exit();
// //     } catch (error) {
// //         console.error('❌ Error seeding database:', error);
// //         process.exit(1);
// //     }
// // };

// // seedDB();


// require('dotenv').config();
// const mongoose = require('mongoose');
// const Template = require('./models/Template'); 

// const templates = [
//     // --- 1. PARASITOLOGY ---
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

//     // --- 2. SEROLOGY ---
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
//     {
//         testCode: 'HEP-B',
//         testName: 'Hepatitis B Profile',
//         category: 'Serology',
//         schemaDefinition: [
//             { fieldName: 'hbsag', label: 'HBSAg', inputType: 'select', options: ['Negative', 'Positive'] },
//             { fieldName: 'hbsab', label: 'HBSAb', inputType: 'select', options: ['Negative', 'Positive'] },
//             { fieldName: 'hbeag', label: 'HBeAg', inputType: 'select', options: ['Negative', 'Positive'] },
//             { fieldName: 'hbeab', label: 'HBeAb', inputType: 'select', options: ['Negative', 'Positive'] },
//             { fieldName: 'hbcab', label: 'HBcAb', inputType: 'select', options: ['Negative', 'Positive'] }
//         ]
//     },

//     // --- 3. HAEMATOLOGY ---
//     {
//         testCode: 'FBC-ADULT',
//         testName: 'Full Blood Count (Adult)',
//         category: 'Haematology',
//         schemaDefinition: [
//             { fieldName: 'pcv', label: 'PCV', inputType: 'number', unit: '%', referenceRange: '34 - 50' },
//             { fieldName: 'hb', label: 'Hb', inputType: 'number', unit: 'g/dl', referenceRange: '11.0 - 17.0' },
//             { fieldName: 'wbc', label: 'WBC', inputType: 'number', unit: 'X 10^9/L', referenceRange: '4.0 - 10.0' },
//             { fieldName: 'neutrophil', label: 'Neutrophil', inputType: 'number', unit: '%', referenceRange: '40 - 70' },
//             { fieldName: 'lymphocyte', label: 'Lymphocyte', inputType: 'number', unit: '%', referenceRange: '20 - 50' },
//             { fieldName: 'monocyte', label: 'Monocyte', inputType: 'number', unit: '%', referenceRange: '2 - 10' },
//             { fieldName: 'eosinophil', label: 'Eosinophil', inputType: 'number', unit: '%', referenceRange: '1 - 8' },
//             { fieldName: 'basophil', label: 'Basophil', inputType: 'number', unit: '%', referenceRange: '0 - 1' },
//             { fieldName: 'platelet', label: 'Platelet', inputType: 'number', unit: 'X 10^9/L', referenceRange: '150 - 400' }
//         ]
//     },

//     // --- 5. IMMUNOASSAY & SPECIALIZED TESTS ---

//     // Updated Female Hormonal Profile (Now includes DHEAS, Testosterone, and Thyroid)
//     {
//         testCode: 'HORM-F',
//         testName: 'Hormonal Profile (Female) & Thyroid',
//         category: 'Immunoassay',
//         schemaDefinition: [
//             { fieldName: 'lh', label: 'LH', inputType: 'number', unit: 'mIU/ml', referenceRange: '2.1-12.7 (Follicular), 1.0-12.0 (Luteal)' },
//             { fieldName: 'fsh', label: 'FSH', inputType: 'number', unit: 'mIU/ml', referenceRange: '2.9-12.0 (Follicular), 1.5-7.0 (Luteal)' },
//             { fieldName: 'prolactin', label: 'Prolactin', inputType: 'number', unit: 'ng/ml', referenceRange: '5.0 - 35.0' },
//             { fieldName: 'progesterone', label: 'Progesterone', inputType: 'number', unit: 'ng/ml', referenceRange: '0.2-1.4 (Follicular), 4-25 (Luteal)' },
//             { fieldName: 'estradiol', label: 'Estradiol', inputType: 'number', unit: 'pg/ml', referenceRange: '10.1-177 (Follicular), 64.8-564 (Ovulation), 42-310 (Luteal)' },
//             { fieldName: 'dheas', label: 'D.H.E.A.S', inputType: 'number', unit: 'ug/dl', referenceRange: '33.9-407.0 (Pre-Menopausal), 9.4-256 (Post-Menopausal)' },
//             { fieldName: 'testosterone', label: 'Testosterone', inputType: 'number', unit: 'ng/ml', referenceRange: '0.1 - 1.2' },
//             { fieldName: 't3', label: 'T3', inputType: 'number', unit: 'nmol/L', referenceRange: '1.23 - 3.08' },
//             { fieldName: 't4', label: 'T4', inputType: 'number', unit: 'nmol/L', referenceRange: '57.9 - 150.6' },
//             { fieldName: 'tsh', label: 'TSH', inputType: 'number', unit: 'uIU/ml', referenceRange: '0.4 - 5.6' }
//         ]
//     },

//     // Male Hormonal Profile
//     {
//         testCode: 'HORM-M',
//         testName: 'Hormonal Profile (Male)',
//         category: 'Immunoassay',
//         schemaDefinition: [
//             { fieldName: 'lh', label: 'LH', inputType: 'number', unit: 'mIU/ml', referenceRange: '1.5 - 9.6' },
//             { fieldName: 'fsh', label: 'FSH', inputType: 'number', unit: 'mIU/ml', referenceRange: '1.7 - 12.0' },
//             { fieldName: 'prolactin', label: 'Prolactin', inputType: 'number', unit: 'ng/ml', referenceRange: '3.0 - 25.0' },
//             { fieldName: 'testosterone', label: 'Testosterone', inputType: 'number', unit: 'ng/ml', referenceRange: '2.0 - 12.0' }
//         ]
//     },

//     // Tumor Markers (PSA, CEA, AFP, BCA, CA-125)
//     {
//         testCode: 'TUMOR-MKR',
//         testName: 'Tumor Markers',
//         category: 'Immunoassay',
//         schemaDefinition: [
//             { fieldName: 'psa', label: 'PSA', inputType: 'number', unit: 'ng/mL', referenceRange: '0-4 (Normal), 4-10 (Suspicious), >10 (Elevated)' },
//             { fieldName: 'cea', label: 'CEA', inputType: 'number', unit: 'ng/ml', referenceRange: '0-5 (Smokers), 0-3 (Non-Smokers)' },
//             { fieldName: 'afp', label: 'AFP', inputType: 'number', unit: 'IU/ml', referenceRange: '0 - 7' },
//             { fieldName: 'bca153', label: 'BCA 15-3 (Breast)', inputType: 'number', unit: 'U/ml', referenceRange: '0 - 34' },
//             { fieldName: 'ca125', label: 'CA-125 (Ovarian)', inputType: 'number', unit: 'U/ml', referenceRange: '0 - 35' }
//         ]
//     },

//     // Viral & Parasitic Antibodies (TORCH Panel)
//     {
//         testCode: 'VIRAL-ABS',
//         testName: 'Viral & Parasitic Antibodies',
//         category: 'Immunoassay',
//         schemaDefinition: [
//             { fieldName: 'toxoIgg', label: 'TOXO-IgG', inputType: 'number', unit: 'UI/ml', referenceRange: '<4.0 (Neg), 4.0-8.0 (Eqv), ≥8.0 (Pos)' },
//             { fieldName: 'toxoIgm', label: 'TOXO-IgM', inputType: 'number', unit: 'UI/ml', referenceRange: '<0.55 (Neg), 0.55-0.65 (Eqv), ≥0.65 (Pos)' },
//             { fieldName: 'hsvIgg', label: 'HSV 1&2 IgG', inputType: 'number', unit: 'UI/ml', referenceRange: '<0.80 (Neg), 0.80-0.99 (Eqv), >0.99 (Pos)' },
//             { fieldName: 'hsvIgm', label: 'HSV 1&2 IgM', inputType: 'number', unit: 'UI/ml', referenceRange: '<0.80 (Neg), 0.80-0.99 (Eqv), >0.99 (Pos)' },
//             { fieldName: 'rubellaIgg', label: 'Rubella IgG', inputType: 'number', unit: 'UI/ml', referenceRange: '<10 (Neg), 10-15 (Eqv), ≥15 (Pos)' },
//             { fieldName: 'rubellaIgm', label: 'Rubella IgM', inputType: 'number', unit: 'UI/ml', referenceRange: '<0.80 (Neg), 0.80-1.20 (Eqv), ≥1.20 (Pos)' },
//             { fieldName: 'varicellaIgg', label: 'Varicella IgG', inputType: 'number', unit: 'UI/ml', referenceRange: '<0.8 (Neg), 0.8-1.2 (Eqv), >1.2 (Pos)' },
//             { fieldName: 'varicellaIgm', label: 'Varicella IgM', inputType: 'number', unit: 'UI/ml', referenceRange: '<0.8 (Neg), 0.8-1.2 (Eqv), >1.2 (Pos)' }
//         ]
//     },

//     // Standalone / Specialized Tests
//     {
//         testCode: 'AMH',
//         testName: 'Anti-Mullerian Hormone (AMH)',
//         category: 'Immunoassay',
//         schemaDefinition: [
//             { fieldName: 'amh', label: 'AMH', inputType: 'number', unit: 'ng/mL', referenceRange: 'M: 0.92-13.89 | F(20-29): 0.88-10.35 | F(30-39): 0.31-7.86' }
//         ]
//     },
//     {
//         testCode: 'CARDIAC',
//         testName: 'Cardiac Markers',
//         category: 'Immunoassay',
//         schemaDefinition: [
//             { fieldName: 'troponinI', label: 'Troponin I', inputType: 'number', unit: 'ng/ml', referenceRange: '0 - 1.5' },
//             { fieldName: 'myoglobin', label: 'Myoglobin', inputType: 'number', unit: 'ng/ml', referenceRange: '0 - 70' }
//         ]
//     },
//     {
//         testCode: 'HBA1C',
//         testName: 'HBA1C (Glycated Hemoglobin)',
//         category: 'Chemistry',
//         schemaDefinition: [
//             { fieldName: 'hba1c', label: 'HBA1C', inputType: 'number', unit: '%', referenceRange: '4.5 - 6.5' }
//         ]
//     },
//     {
//         testCode: 'HSCRP',
//         testName: 'HsCRP (C-Reactive Protein)',
//         category: 'Immunoassay',
//         schemaDefinition: [
//             { fieldName: 'crp', label: 'CRP', inputType: 'number', unit: 'Mg/L', referenceRange: '<1.0 (Low), 1.0-3.0 (Avg), >3.0 (High)' }
//         ]
//     },
//     {
//         testCode: 'MISC-IMMUNO',
//         testName: 'Misc Immunoassay (IgE, D-Dimer, Beta HCG, G6PD)',
//         category: 'Immunoassay',
//         schemaDefinition: [
//             { fieldName: 'ige', label: 'IgE', inputType: 'number', unit: 'IU/ml', referenceRange: '5 - 1000' },
//             { fieldName: 'ddimer', label: 'D-DIMER', inputType: 'number', unit: 'ng/ml', referenceRange: '0 - 500' },
//             { fieldName: 'betahcg', label: 'BETA HCG', inputType: 'number', unit: 'mIU/ml', referenceRange: '0 - 10' },
//             { fieldName: 'g6pd', label: 'G6PD', inputType: 'number', unit: 'mU/10^9 Erythrocyte', referenceRange: '245 - 299' }
//         ]
//     },
//     {
//         testCode: 'HPV-SWAB',
//         testName: 'Human Papilloma Virus (HPV) - Swab',
//         category: 'Immunoassay',
//         schemaDefinition: [
//             { fieldName: 'hpvResult', label: 'HPV Result', inputType: 'text', referenceRange: 'Negative' }
//         ]
//     },

//     // --- 7. COAGULATION PROFILE ---
//     {
//         testCode: 'COAG',
//         testName: 'Coagulation Profile (PT/INR & APTT)',
//         category: 'Haematology',
//         schemaDefinition: [
//             { fieldName: 'ptPatient', label: 'PT of Patient', inputType: 'number', unit: 'seconds', referenceRange: '10 - 14.5' },
//             { fieldName: 'ptControl', label: 'PT of Control', inputType: 'number', unit: 'seconds', referenceRange: '10 - 14.5' },
//             { fieldName: 'inr', label: 'INR', inputType: 'number', referenceRange: '0.9-1.1 (Healthy), 1.5-2.0 (DVT), 2.5-3.5 (Oral Anticoagulant), 3.0-4.0 (Pulmonary Embolism)' },
//             { fieldName: 'apttPatient', label: 'Partial Thromboplastin Time (APTT)', inputType: 'number', unit: 'seconds', referenceRange: '30 - 40' },
//             { fieldName: 'apttControl', label: 'PTT Control', inputType: 'number', unit: 'seconds' }
//         ]
//     },

//     // --- 8. BLOOD TYPING & ESR ---
//     {
//         testCode: 'BG-GENO',
//         testName: 'Blood Group & Genotype',
//         category: 'Haematology',
//         schemaDefinition: [
//             { fieldName: 'bloodGroup', label: 'Blood Group', inputType: 'select', options: ['"O" Rh "D" Positive', '"O" Rh "D" Negative', '"A" Rh "D" Positive', '"A" Rh "D" Negative', '"B" Rh "D" Positive', '"B" Rh "D" Negative', '"AB" Rh "D" Positive', '"AB" Rh "D" Negative'] },
//             { fieldName: 'genotype', label: 'Hb Genotype', inputType: 'select', options: ['AA', 'AS', 'SS', 'SC', 'AC'] }
//         ]
//     },
//     {
//         testCode: 'ESR',
//         testName: 'Erythrocyte Sedimentation Rate (ESR)',
//         category: 'Haematology',
//         schemaDefinition: [
//             { fieldName: 'esr', label: 'ESR', inputType: 'number', unit: 'mm/hr', referenceRange: '0 - 20' }
//         ]
//     },
//     {
//         testCode: 'COOMBS',
//         testName: 'Coombs Test',
//         category: 'Haematology',
//         schemaDefinition: [
//             { fieldName: 'directCoombs', label: 'Direct Coombs Test', inputType: 'select', options: ['Negative', 'Positive'] },
//             { fieldName: 'indirectCoombs', label: 'Indirect Coombs Test', inputType: 'select', options: ['Negative', 'Positive'] }
//         ]
//     },

//     // --- 9. RAPID SEROLOGY SCREENS ---
//     {
//         testCode: 'RAPID-SCREEN',
//         testName: 'Rapid Serology Screening Panel',
//         category: 'Serology',
//         schemaDefinition: [
//             { fieldName: 'hiv', label: 'HIV I & II Screening', inputType: 'text', referenceRange: 'Negative' },
//             { fieldName: 'hcv', label: 'HCV Screening', inputType: 'select', options: ['Negative', 'Positive', 'Reactive', 'Non-Reactive'] },
//             { fieldName: 'vdrl', label: 'VDRL Screening', inputType: 'select', options: ['Negative', 'Positive', 'Reactive', 'Non-Reactive'] },
//             { fieldName: 'hPyloriBlood', label: 'H. Pylori (Blood)', inputType: 'select', options: ['Negative', 'Positive'] },
//             { fieldName: 'hPyloriStool', label: 'H. Pylori (Stool Ag)', inputType: 'select', options: ['Negative', 'Positive'] },
//             { fieldName: 'fob', label: 'Fecal Occult Blood', inputType: 'select', options: ['Negative', 'Positive'] },
//             { fieldName: 'pregnancy', label: 'Blood Pregnancy Test', inputType: 'select', options: ['Negative', 'Positive'] },
//             { fieldName: 'gonococci', label: 'Gonococci Antigen', inputType: 'select', options: ['Negative', 'Positive'] },
//             { fieldName: 'chlamydia', label: 'Chlamydia Antigen', inputType: 'select', options: ['Negative', 'Positive'] },
//             { fieldName: 'asoTiter', label: 'ASO Titer', inputType: 'select', options: ['Negative', 'Positive'] },
//             { fieldName: 'rf', label: 'Rheumatoid Factor', inputType: 'select', options: ['Negative', 'Positive'] },
//             { fieldName: 'serumTb', label: 'Serum TB Screening', inputType: 'select', options: ['Negative', 'Positive'] }
//         ]
//     },

//     // --- 10. MISCELLANEOUS MICROSCOPY ---
//     {
//         testCode: 'SKIN-SCRAPING',
//         testName: 'Skin Scraping (Microscopy)',
//         category: 'Microbiology',
//         schemaDefinition: [
//             { fieldName: 'microscopy', label: 'Microscopy Result', inputType: 'text', referenceRange: 'No adult Sarcoptes scabiei or eggs seen' }
//         ]
//     },
//     {
//         testCode: 'MICROFILARIA',
//         testName: 'Microfilaria Screen',
//         category: 'Microbiology',
//         schemaDefinition: [
//             { fieldName: 'microfilaria', label: 'Microfilaria Result', inputType: 'text', referenceRange: 'No microfilaria seen' }
//         ]
//     },

//     // --- 11. PLASMA PROTEIN ---
//     {
//         testCode: 'PLASMA-PROT',
//         testName: 'Plasma Protein',
//         category: 'Chemistry',
//         schemaDefinition: [
//             { fieldName: 'totalProtein', label: 'Total Protein', inputType: 'number', unit: 'g/dl', referenceRange: '6.0 - 8.4' },
//             { fieldName: 'albumin', label: 'Albumin', inputType: 'number', unit: 'g/dl', referenceRange: '3.5 - 5.2' },
//             { fieldName: 'globulin', label: 'Globulin', inputType: 'number', unit: 'g/dl', referenceRange: '2.0 - 3.8' },
//             { fieldName: 'agRatio', label: 'A/G Ratio', inputType: 'text', referenceRange: 'Normal' }
//         ]
//     },

//     // --- 12. DIABETIC PROFILE ---
//     {
//         testCode: 'DIABETIC-PROF',
//         testName: 'Diabetic Profile',
//         category: 'Chemistry',
//         schemaDefinition: [
//             { fieldName: 'fbs', label: 'Fasting Blood Sugar', inputType: 'number', unit: 'mg/dl', referenceRange: '70 - 120' },
//             { fieldName: 'hpp2', label: '2 HPP', inputType: 'number', unit: 'mg/dl', referenceRange: '70 - 140' },
//             { fieldName: 'rbs', label: 'Random Blood Sugar', inputType: 'number', unit: 'mg/dl', referenceRange: '70 - 140' },
//             { fieldName: 'hba1c', label: 'HBA1C', inputType: 'number', unit: '%', referenceRange: '4.5 - 6.5' },
//             { fieldName: 'eAg', label: 'Estimated Average Glucose (eAG)', inputType: 'number', unit: 'mg/dl', referenceRange: 'eAG = (28.7 X HbA1C) - 46.7' }
//         ]
//     },

//     // --- 13. OGTT (Oral Glucose Tolerance Test) ---
//     {
//         testCode: 'OGTT',
//         testName: 'Oral Glucose Tolerance Test (OGTT)',
//         category: 'Chemistry',
//         schemaDefinition: [
//             { fieldName: 'fbs', label: 'Fasting Blood Sugar', inputType: 'number', unit: 'mg/dl', referenceRange: '70 - 120' },
//             { fieldName: 'min30', label: '30 Minutes', inputType: 'number', unit: 'mg/dl', referenceRange: '70 - 140' },
//             { fieldName: 'min60', label: '60 Minutes', inputType: 'number', unit: 'mg/dl', referenceRange: '70 - 140' },
//             { fieldName: 'min90', label: '90 Minutes', inputType: 'number', unit: 'mg/dl', referenceRange: '70 - 140' },
//             { fieldName: 'min120', label: '120 Minutes', inputType: 'number', unit: 'mg/dl', referenceRange: '70 - 140' }
//         ]
//     },

//     // --- 14. UPDATED EXTENDED LIVER PROFILE ---
//     {
//         testCode: 'LFT-EXT',
//         testName: 'Liver Profile (Extended)',
//         category: 'Chemistry',
//         schemaDefinition: [
//             { fieldName: 'tBil', label: 'Total Bilirubin', inputType: 'number', unit: 'mg/dl', referenceRange: '0 - 1.0' },
//             { fieldName: 'dBil', label: 'Direct Bilirubin', inputType: 'number', unit: 'mg/dl', referenceRange: '0 - 0.4' },
//             { fieldName: 'ast', label: 'AST', inputType: 'number', unit: 'U/L', referenceRange: 'Up to 40' },
//             { fieldName: 'alt', label: 'ALT', inputType: 'number', unit: 'U/L', referenceRange: 'Up to 40' },
//             { fieldName: 'alp', label: 'ALP', inputType: 'number', unit: 'U/L', referenceRange: '20-270 (Male), 20-240 (Female)' }
//         ]
//     },

//     // --- 15. UPDATED EXTENDED LIPID PROFILE (Added VLDL) ---
//     {
//         testCode: 'LIPID-EXT',
//         testName: 'Lipid Profile (Extended)',
//         category: 'Chemistry',
//         schemaDefinition: [
//             { fieldName: 'cholesterol', label: 'Total Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '< 200 (Normal), 200-239 (Borderline), ≥ 240 (High)' },
//             { fieldName: 'triglycerides', label: 'Triglycerides', inputType: 'number', unit: 'mg/dl', referenceRange: '< 150 (Normal), 150-199 (Borderline), 200-499 (High), > 500 (Very High)' },
//             { fieldName: 'hdl', label: 'HDL Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '30 - 75' },
//             { fieldName: 'ldl', label: 'LDL Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '66 - 178' },
//             { fieldName: 'vldl', label: 'VLDL', inputType: 'number', unit: 'mg/dl', referenceRange: '2 - 30' } // Standard VLDL range added
//         ]
//     },

//     // --- 16. UPDATED EXTENDED RENAL PROFILE ---
//     {
//         testCode: 'RENAL-EXT',
//         testName: 'Renal Profile (Extended)',
//         category: 'Chemistry',
//         schemaDefinition: [
//             { fieldName: 'na', label: 'Na+', inputType: 'number', unit: 'mmol/L', referenceRange: '135 - 145' },
//             { fieldName: 'cl', label: 'Cl-', inputType: 'number', unit: 'mmol/L', referenceRange: '98 - 108' },
//             { fieldName: 'k', label: 'K+', inputType: 'number', unit: 'mmol/L', referenceRange: '3.5 - 5.5' },
//             { fieldName: 'hco3', label: 'HCO3-', inputType: 'number', unit: 'mmol/L', referenceRange: '21 - 28' },
//             { fieldName: 'urea', label: 'Urea', inputType: 'number', unit: 'mg/dl', referenceRange: '10 - 55' },
//             { fieldName: 'creatinine', label: 'Creatinine', inputType: 'number', unit: 'mg/dl', referenceRange: '0.6-1.3 (Male), 0.6-1.2 (Female)' },
//             { fieldName: 'uricAcid', label: 'Uric Acid', inputType: 'number', unit: 'mg/dl', referenceRange: '2.0-5.0 (Child), 2.5-6.5 (Adult F), 3.5-7.5 (Adult M)' },
//             { fieldName: 'calcium', label: 'Calcium', inputType: 'number', unit: 'mg/dl', referenceRange: '11.0-13.0 (Child), 8.6-10.2 (Adult)' },
//             { fieldName: 'phosphorus', label: 'Phosphorus', inputType: 'number', unit: 'mg/dl', referenceRange: '2.5 - 4.5' },
//             { fieldName: 'egfr', label: 'eGFR (CKD-EPI 2021)', inputType: 'number', unit: 'ml/min/1.73m2', referenceRange: '90-120. (G1: ≥90, G2: 60-89, G3a: 45-59, G3b: 30-44, G4: 15-29, G5: <15)' }
//         ]
//     },
// // --- 17. URINE & STOOL M/C/S ---
//     {
//         testCode: 'URINE-MCS',
//         testName: 'Urine M/C/S',
//         category: 'Microbiology',
//         schemaDefinition: [
//             { fieldName: 'appearance', label: 'Appearance', inputType: 'text' },
//             { fieldName: 'colour', label: 'Colour', inputType: 'text' },
//             { fieldName: 'pusCells', label: 'Pus Cells (/HPF)', inputType: 'text' },
//             { fieldName: 'epithelialCells', label: 'Epithelial Cells (/HPF)', inputType: 'text' },
//             { fieldName: 'yeastCells', label: 'Yeast Cells', inputType: 'text', referenceRange: 'Nil' },
//             { fieldName: 'crystals', label: 'Crystals', inputType: 'text', referenceRange: 'Nil' },
//             { fieldName: 'casts', label: 'Casts', inputType: 'text', referenceRange: 'Nil' },
//             { fieldName: 'culture', label: 'Culture Yield', inputType: 'text' },
//             { fieldName: 'sensitiveHigh', label: 'Sensitivity (+++)', inputType: 'text' },
//             { fieldName: 'sensitiveMed', label: 'Sensitivity (++)', inputType: 'text' },
//             { fieldName: 'sensitiveLow', label: 'Sensitivity (+)', inputType: 'text' },
//             { fieldName: 'resistance', label: 'Resistance', inputType: 'text' }
//         ]
//     },
//     {
//         testCode: 'STOOL-MCS',
//         testName: 'Stool M/C/S',
//         category: 'Microbiology',
//         schemaDefinition: [
//             { fieldName: 'macroscopy', label: 'Macroscopy', inputType: 'text', referenceRange: 'Brownish formed, no mucus, no blood' },
//             { fieldName: 'microscopy', label: 'Microscopy', inputType: 'text', referenceRange: 'No cyst or ova of parasite seen' },
//             { fieldName: 'culture', label: 'Culture Yield', inputType: 'text', referenceRange: 'No enteric pathogenic organism isolated' },
//             { fieldName: 'sensitiveHigh', label: 'Sensitivity (+++)', inputType: 'text' },
//             { fieldName: 'sensitiveMed', label: 'Sensitivity (++)', inputType: 'text' },
//             { fieldName: 'sensitiveLow', label: 'Sensitivity (+)', inputType: 'text' },
//             { fieldName: 'resistance', label: 'Resistance', inputType: 'text' }
//         ]
//     },

//     // --- 18. SWABS & GENITAL INFECTIONS ---
//     {
//         testCode: 'HVS-MCS',
//         testName: 'HVS M/C/S (High Vaginal Swab)',
//         category: 'Microbiology',
//         schemaDefinition: [
//             { fieldName: 'pusCells', label: 'Pus Cells (/HPF)', inputType: 'text' },
//             { fieldName: 'epithelialCells', label: 'Epithelial Cells (/HPF)', inputType: 'text' },
//             { fieldName: 'yeastCells', label: 'Yeast Cells', inputType: 'text', referenceRange: 'Nil' },
//             { fieldName: 'tVaginalis', label: 'T. vaginalis', inputType: 'text', referenceRange: 'Nil' },
//             { fieldName: 'culture', label: 'Culture Yield', inputType: 'text' },
//             { fieldName: 'sensitiveHigh', label: 'Sensitivity (+++)', inputType: 'text' },
//             { fieldName: 'sensitiveMed', label: 'Sensitivity (++)', inputType: 'text' },
//             { fieldName: 'sensitiveLow', label: 'Sensitivity (+)', inputType: 'text' },
//             { fieldName: 'resistance', label: 'Resistance', inputType: 'text' }
//         ]
//     },
//     {
//         testCode: 'SWAB-MCS-GENERIC',
//         testName: 'Swab M/C/S (Wound, Nasal, Urethral, Endocervical, Sputum)',
//         category: 'Microbiology',
//         schemaDefinition: [
//             { fieldName: 'macroscopy', label: 'Macroscopy (Optional)', inputType: 'text' },
//             { fieldName: 'gramStain', label: 'Microscopy (Gram Stain)', inputType: 'text' },
//             { fieldName: 'culture', label: 'Culture Yield', inputType: 'text' },
//             { fieldName: 'sensitiveHigh', label: 'Sensitivity (+++)', inputType: 'text' },
//             { fieldName: 'sensitiveMed', label: 'Sensitivity (++)', inputType: 'text' },
//             { fieldName: 'sensitiveLow', label: 'Sensitivity (+)', inputType: 'text' },
//             { fieldName: 'resistance', label: 'Resistance', inputType: 'text' }
//         ]
//     },

//     // --- 19. SEMINAL FLUID ANALYSIS (SFA) ---
//     {
//         testCode: 'SFA',
//         testName: 'Seminal Fluid Analysis (SFA)',
//         category: 'Microbiology',
//         schemaDefinition: [
//             // Physical
//             { fieldName: 'timeProduced', label: 'Time Produced', inputType: 'text' },
//             { fieldName: 'timeReceived', label: 'Time Received', inputType: 'text' },
//             { fieldName: 'timeAnalysed', label: 'Time Analysed', inputType: 'text' },
//             { fieldName: 'abstinence', label: 'Period of Abstinence (Days)', inputType: 'text' },
//             { fieldName: 'colour', label: 'Colour', inputType: 'text' },
//             { fieldName: 'volume', label: 'Volume', inputType: 'number', unit: 'ml', referenceRange: '≥ 1.5' },
//             { fieldName: 'consistency', label: 'Consistency', inputType: 'text' },
//             { fieldName: 'liquefaction', label: 'Liquefaction', inputType: 'text' },
//             { fieldName: 'ph', label: 'PH', inputType: 'number', referenceRange: '≥ 7.2' },
            
//             // Morphology & Motility
//             { fieldName: 'normalForm', label: 'Normal Form', inputType: 'number', unit: '%' },
//             { fieldName: 'abnormalForm', label: 'Abnormal Form', inputType: 'number', unit: '%' },
//             { fieldName: 'progMotility', label: 'Progressive Motility (PR)', inputType: 'number', unit: '%' },
//             { fieldName: 'nonProgMotility', label: 'Non-Progressive (NP)', inputType: 'number', unit: '%' },
//             { fieldName: 'immotile', label: 'Immotile (IM)', inputType: 'number', unit: '%' },
//             { fieldName: 'totalMotility', label: 'Total Motility (PR + NP)', inputType: 'number', unit: '%', referenceRange: '≥ 40%' },
            
//             // Microscopy & Counts
//             { fieldName: 'pusCells', label: 'Pus Cells (/HPF)', inputType: 'text', referenceRange: '0 - 2' },
//             { fieldName: 'spermatocytes', label: 'Spermatocytes (Round Cells)', inputType: 'text', referenceRange: 'Nil' },
//             { fieldName: 'epithelialCell', label: 'Epithelial Cell (/HPF)', inputType: 'text' },
//             { fieldName: 'rbc', label: 'RBC', inputType: 'text' },
//             { fieldName: 'yeastCell', label: 'Yeast Cell', inputType: 'text', referenceRange: 'Nil' },
//             { fieldName: 'agglutination', label: 'Sperm Agglutination', inputType: 'select', options: ['Absent', 'Present'] },
//             { fieldName: 'spermConcentration', label: 'Sperm Concentration', inputType: 'number', unit: 'x 10^6 cells/ml', referenceRange: '≥ 15' },
//             { fieldName: 'totalCount', label: 'Total Count', inputType: 'number', unit: 'x 10^6 / Ejaculate', referenceRange: '≥ 39' },
            
//             // Culture
//             { fieldName: 'culture', label: 'Culture Yield', inputType: 'text' }
//         ]
//     },

//     // --- 20. SPECIALIZED BACTERIOLOGY ---
//     {
//         testCode: 'BLOOD-CULTURE',
//         testName: 'Blood Culture',
//         category: 'Microbiology',
//         schemaDefinition: [
//             { fieldName: 'culture', label: 'Blood Culture Result', inputType: 'text', referenceRange: 'Yielded no growth after 7 days of incubation' }
//         ]
//     },
//     {
//         testCode: 'MANTOUX',
//         testName: 'Mantoux Test',
//         category: 'Microbiology',
//         schemaDefinition: [
//             { fieldName: 'dateInoculation', label: 'Date of Inoculation', inputType: 'text' },
//             { fieldName: 'timeInoculation', label: 'Time of Inoculation', inputType: 'text' },
//             { fieldName: 'dateExam', label: 'Date of Examination', inputType: 'text' },
//             { fieldName: 'timeExam', label: 'Time of Examination', inputType: 'text' },
//             { fieldName: 'induration', label: 'Result (Induration)', inputType: 'number', unit: 'mm', referenceRange: '< 10mm (Normal)' }
//         ]
//     },
//     {
//         testCode: 'AFB-SPUTUM',
//         testName: 'AFB Sputum (Tuberculosis Screen)',
//         category: 'Microbiology',
//         schemaDefinition: [
//             { fieldName: 'macroscopy', label: 'Macroscopy', inputType: 'text' },
//             { fieldName: 'afb1', label: 'AFB X1', inputType: 'text', referenceRange: 'No AFB seen' },
//             { fieldName: 'afb2', label: 'AFB X2', inputType: 'text', referenceRange: 'No AFB seen' },
//             { fieldName: 'afb3', label: 'AFB X3', inputType: 'text', referenceRange: 'No AFB seen' }
//         ]
//     },
//     // --- 3. HAEMATOLOGY ---
//     {
//         testCode: 'FBC-ADULT-M',
//         testName: 'Full Blood Count (Adult Male)',
//         category: 'Haematology',
//         schemaDefinition: [
//             { fieldName: 'pcv', label: 'PCV', inputType: 'number', unit: '%', referenceRange: '38 - 50' },
//             { fieldName: 'hb', label: 'Hb', inputType: 'number', unit: 'g/dl', referenceRange: '13.0 - 17.0' },
//             { fieldName: 'wbc', label: 'WBC', inputType: 'number', unit: 'X 10^9/L', referenceRange: '4.0 - 10.0' },
//             { fieldName: 'neutrophil', label: 'Neutrophil', inputType: 'number', unit: '%', referenceRange: '40 - 70' },
//             { fieldName: 'lymphocyte', label: 'Lymphocyte', inputType: 'number', unit: '%', referenceRange: '20 - 50' },
//             { fieldName: 'monocyte', label: 'Monocyte', inputType: 'number', unit: '%', referenceRange: '2 - 10' },
//             { fieldName: 'eosinophil', label: 'Eosinophil', inputType: 'number', unit: '%', referenceRange: '1 - 8' },
//             { fieldName: 'basophil', label: 'Basophil', inputType: 'number', unit: '%', referenceRange: '0 - 1' },
//             { fieldName: 'platelet', label: 'Platelet', inputType: 'number', unit: 'X 10^9/L', referenceRange: '150 - 400' },
//             { fieldName: 'rbc', label: 'RBC', inputType: 'number', unit: 'X 10^12/L', referenceRange: '4.1 - 5.7' },
//             { fieldName: 'mchc', label: 'MCHC', inputType: 'number', unit: 'g/dl', referenceRange: '32.0 - 35.5' },
//             { fieldName: 'mch', label: 'MCH', inputType: 'number', unit: 'pg', referenceRange: '27.8 - 33.8' },
//             { fieldName: 'mcv', label: 'MCV', inputType: 'number', unit: 'fL', referenceRange: '83.9 - 99.1' }
//         ]
//     },
//     {
//         testCode: 'FBC-ADULT-F',
//         testName: 'Full Blood Count (Adult Female)',
//         category: 'Haematology',
//         schemaDefinition: [
//             { fieldName: 'pcv', label: 'PCV', inputType: 'number', unit: '%', referenceRange: '34 - 45' },
//             { fieldName: 'hb', label: 'Hb', inputType: 'number', unit: 'g/dl', referenceRange: '11.0 - 15.0' },
//             { fieldName: 'wbc', label: 'WBC', inputType: 'number', unit: 'X 10^9/L', referenceRange: '4.0 - 10.0' },
//             { fieldName: 'neutrophil', label: 'Neutrophil', inputType: 'number', unit: '%', referenceRange: '40 - 70' },
//             { fieldName: 'lymphocyte', label: 'Lymphocyte', inputType: 'number', unit: '%', referenceRange: '20 - 50' },
//             { fieldName: 'monocyte', label: 'Monocyte', inputType: 'number', unit: '%', referenceRange: '2 - 10' },
//             { fieldName: 'eosinophil', label: 'Eosinophil', inputType: 'number', unit: '%', referenceRange: '1 - 8' },
//             { fieldName: 'basophil', label: 'Basophil', inputType: 'number', unit: '%', referenceRange: '0 - 1' },
//             { fieldName: 'platelet', label: 'Platelet', inputType: 'number', unit: 'X 10^9/L', referenceRange: '150 - 400' },
//             { fieldName: 'rbc', label: 'RBC', inputType: 'number', unit: 'X 10^12/L', referenceRange: '3.7 - 5.1' },
//             { fieldName: 'mchc', label: 'MCHC', inputType: 'number', unit: 'g/dl', referenceRange: '32.2 - 36.2' },
//             { fieldName: 'mch', label: 'MCH', inputType: 'number', unit: 'pg', referenceRange: '26.9 - 33.3' },
//             { fieldName: 'mcv', label: 'MCV', inputType: 'number', unit: 'fL', referenceRange: '82.6 - 99.1' }
//         ]
//     },

//     // --- 4. CHEMISTRY ---
//     {
//         testCode: 'LIPID',
//         testName: 'Lipid Profile',
//         category: 'Chemistry',
//         schemaDefinition: [
//             { fieldName: 'cholesterol', label: 'Total Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '< 200 (Normal), 200-239 (Borderline), ≥ 240 (High)' },
//             { fieldName: 'triglycerides', label: 'Triglycerides', inputType: 'number', unit: 'mg/dl', referenceRange: '< 150 (Normal), 150-199 (Borderline), 200-499 (High), > 500 (Very High)' },
//             { fieldName: 'hdl', label: 'HDL Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '30 - 75' },
//             { fieldName: 'ldl', label: 'LDL Cholesterol', inputType: 'number', unit: 'mg/dl', referenceRange: '66 - 178' }
//         ]
//     },
//     {
//         testCode: 'LFT',
//         testName: 'Liver Profile',
//         category: 'Chemistry',
//         schemaDefinition: [
//             { fieldName: 'tBil', label: 'Total Bilirubin', inputType: 'number', unit: 'mg/dl', referenceRange: '0 - 1.0' },
//             { fieldName: 'dBil', label: 'Direct Bilirubin', inputType: 'number', unit: 'mg/dl', referenceRange: '0 - 0.4' },
//             { fieldName: 'ast', label: 'AST', inputType: 'number', unit: 'U/L', referenceRange: 'Up to 40' },
//             { fieldName: 'alt', label: 'ALT', inputType: 'number', unit: 'U/L', referenceRange: 'Up to 40' },
//             { fieldName: 'alp', label: 'ALP', inputType: 'number', unit: 'U/L', referenceRange: '20 - 270' }
//         ]
//     },
//     {
//         testCode: 'RENAL',
//         testName: 'Renal Profile',
//         category: 'Chemistry',
//         schemaDefinition: [
//             { fieldName: 'na', label: 'Na+', inputType: 'number', unit: 'mmol/L', referenceRange: '135 - 145' },
//             { fieldName: 'cl', label: 'Cl-', inputType: 'number', unit: 'mmol/L', referenceRange: '98 - 108' },
//             { fieldName: 'k', label: 'K+', inputType: 'number', unit: 'mmol/L', referenceRange: '3.5 - 5.5' },
//             { fieldName: 'hco3', label: 'HCO3-', inputType: 'number', unit: 'mmol/L', referenceRange: '21 - 28' },
//             { fieldName: 'urea', label: 'Urea', inputType: 'number', unit: 'mg/dl', referenceRange: '10 - 55' },
//             { fieldName: 'creatinine', label: 'Creatinine', inputType: 'number', unit: 'mg/dl', referenceRange: '0.6 - 1.3' }
//         ]
//     },

//     // --- 5. IMMUNOASSAY / HORMONAL ---
//     {
//         testCode: 'HORM-F',
//         testName: 'Hormonal Profile (Female)',
//         category: 'Immunoassay',
//         schemaDefinition: [
//             { fieldName: 'lh', label: 'LH', inputType: 'number', unit: 'mIU/ml', referenceRange: '2.1-12.7 (Follicular), 1.0-12.0 (Luteal)' },
//             { fieldName: 'fsh', label: 'FSH', inputType: 'number', unit: 'mIU/ml', referenceRange: '2.9-12.0 (Follicular), 1.5-7.0 (Luteal)' },
//             { fieldName: 'prolactin', label: 'Prolactin', inputType: 'number', unit: 'ng/ml', referenceRange: '5.0 - 35.0' },
//             { fieldName: 'progesterone', label: 'Progesterone', inputType: 'number', unit: 'ng/ml', referenceRange: '0.2-1.4 (Follicular), 4-25 (Luteal)' },
//             { fieldName: 'estradiol', label: 'Estradiol', inputType: 'number', unit: 'pg/ml', referenceRange: '10.1-177 (Follicular), 42-310 (Luteal)' }
//         ]
//     },

//     // --- 6. MICROBIOLOGY ---
//     {
//         testCode: 'URINALYSIS',
//         testName: 'Urinalysis',
//         category: 'Microbiology',
//         schemaDefinition: [
//             { fieldName: 'colour', label: 'Colour', inputType: 'text' },
//             { fieldName: 'appearance', label: 'Appearance', inputType: 'text' },
//             { fieldName: 'ph', label: 'PH', inputType: 'text' },
//             { fieldName: 'specificGravity', label: 'Specific Gravity', inputType: 'text' },
//             { fieldName: 'glucose', label: 'Glucose', inputType: 'select', options: ['Negative', '+', '++', '+++'] },
//             { fieldName: 'protein', label: 'Protein', inputType: 'select', options: ['Negative', '+', '++', '+++'] },
//             { fieldName: 'blood', label: 'Blood', inputType: 'select', options: ['Negative', '+', '++', '+++'] },
//             { fieldName: 'leucocyte', label: 'Leucocyte', inputType: 'select', options: ['Negative', '+', '++', '+++'] },
//             { fieldName: 'nitrite', label: 'Nitrite', inputType: 'select', options: ['Negative', 'Positive'] }
//         ]
//     },
//     {
//         testCode: 'URINE-MCS',
//         testName: 'Urine M/C/S',
//         category: 'Microbiology',
//         schemaDefinition: [
//             { fieldName: 'pusCells', label: 'Pus Cells (/HPF)', inputType: 'text' },
//             { fieldName: 'epithelialCells', label: 'Epithelial Cells (/HPF)', inputType: 'text' },
//             { fieldName: 'yeastCells', label: 'Yeast Cells', inputType: 'text', referenceRange: 'Nil' },
//             { fieldName: 'culture', label: 'Culture Yield', inputType: 'text' },
//             { fieldName: 'sensitiveHigh', label: 'Sensitivity (+++)', inputType: 'text' },
//             { fieldName: 'sensitiveMed', label: 'Sensitivity (++)', inputType: 'text' },
//             { fieldName: 'sensitiveLow', label: 'Sensitivity (+)', inputType: 'text' },
//             { fieldName: 'resistance', label: 'Resistance', inputType: 'text' }
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
    // ==========================================
    // 1. PARASITOLOGY
    // ==========================================
    {
        testCode: 'MP',
        testName: 'Malaria Parasite',
        category: 'Parasitology',
        schemaDefinition: [
            { fieldName: 'malariaResult', label: 'Malaria Parasite Result', inputType: 'select', options: ['Negative', 'Trophozoite of Plasmodium falciparum (+) seen', 'Trophozoite of Plasmodium falciparum (++) seen', 'Trophozoite of Plasmodium falciparum (+++) seen'], referenceRange: 'Negative' }
        ]
    },

    // ==========================================
    // 2. SEROLOGY & RAPID SCREENS
    // ==========================================
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
    {
        testCode: 'RAPID-SCREEN',
        testName: 'Rapid Serology Screening Panel',
        category: 'Serology',
        schemaDefinition: [
            { fieldName: 'hiv', label: 'HIV I & II Screening', inputType: 'text', referenceRange: 'Negative' },
            { fieldName: 'hcv', label: 'HCV Screening', inputType: 'select', options: ['Negative', 'Positive', 'Reactive', 'Non-Reactive'] },
            { fieldName: 'vdrl', label: 'VDRL Screening', inputType: 'select', options: ['Negative', 'Positive', 'Reactive', 'Non-Reactive'] },
            { fieldName: 'hPyloriBlood', label: 'H. Pylori (Blood)', inputType: 'select', options: ['Negative', 'Positive'] },
            { fieldName: 'hPyloriStool', label: 'H. Pylori (Stool Ag)', inputType: 'select', options: ['Negative', 'Positive'] },
            { fieldName: 'fob', label: 'Fecal Occult Blood', inputType: 'select', options: ['Negative', 'Positive'] },
            { fieldName: 'pregnancy', label: 'Blood Pregnancy Test', inputType: 'select', options: ['Negative', 'Positive'] },
            { fieldName: 'gonococci', label: 'Gonococci Antigen', inputType: 'select', options: ['Negative', 'Positive'] },
            { fieldName: 'chlamydia', label: 'Chlamydia Antigen', inputType: 'select', options: ['Negative', 'Positive'] },
            { fieldName: 'asoTiter', label: 'ASO Titer', inputType: 'select', options: ['Negative', 'Positive'] },
            { fieldName: 'rf', label: 'Rheumatoid Factor', inputType: 'select', options: ['Negative', 'Positive'] },
            { fieldName: 'serumTb', label: 'Serum TB Screening', inputType: 'select', options: ['Negative', 'Positive'] }
        ]
    },

    // ==========================================
    // 3. HAEMATOLOGY & COAGULATION
    // ==========================================
    {
        testCode: 'FBC-ADULT-M',
        testName: 'Full Blood Count (Adult Male)',
        category: 'Haematology',
        schemaDefinition: [
            { fieldName: 'pcv', label: 'PCV', inputType: 'number', unit: '%', referenceRange: '38 - 50' },
            { fieldName: 'hb', label: 'Hb', inputType: 'number', unit: 'g/dl', referenceRange: '13.0 - 17.0' },
            { fieldName: 'wbc', label: 'WBC', inputType: 'number', unit: 'X 10^9/L', referenceRange: '4.0 - 10.0' },
            { fieldName: 'neutrophil', label: 'Neutrophil', inputType: 'number', unit: '%', referenceRange: '40 - 70' },
            { fieldName: 'lymphocyte', label: 'Lymphocyte', inputType: 'number', unit: '%', referenceRange: '20 - 50' },
            { fieldName: 'monocyte', label: 'Monocyte', inputType: 'number', unit: '%', referenceRange: '2 - 10' },
            { fieldName: 'eosinophil', label: 'Eosinophil', inputType: 'number', unit: '%', referenceRange: '1 - 8' },
            { fieldName: 'basophil', label: 'Basophil', inputType: 'number', unit: '%', referenceRange: '0 - 1' },
            { fieldName: 'platelet', label: 'Platelet', inputType: 'number', unit: 'X 10^9/L', referenceRange: '150 - 400' },
            { fieldName: 'rbc', label: 'RBC', inputType: 'number', unit: 'X 10^12/L', referenceRange: '4.1 - 5.7' },
            { fieldName: 'mchc', label: 'MCHC', inputType: 'number', unit: 'g/dl', referenceRange: '32.0 - 35.5' },
            { fieldName: 'mch', label: 'MCH', inputType: 'number', unit: 'pg', referenceRange: '27.8 - 33.8' },
            { fieldName: 'mcv', label: 'MCV', inputType: 'number', unit: 'fL', referenceRange: '83.9 - 99.1' }
        ]
    },
    {
        testCode: 'FBC-ADULT-F',
        testName: 'Full Blood Count (Adult Female)',
        category: 'Haematology',
        schemaDefinition: [
            { fieldName: 'pcv', label: 'PCV', inputType: 'number', unit: '%', referenceRange: '34 - 45' },
            { fieldName: 'hb', label: 'Hb', inputType: 'number', unit: 'g/dl', referenceRange: '11.0 - 15.0' },
            { fieldName: 'wbc', label: 'WBC', inputType: 'number', unit: 'X 10^9/L', referenceRange: '4.0 - 10.0' },
            { fieldName: 'neutrophil', label: 'Neutrophil', inputType: 'number', unit: '%', referenceRange: '40 - 70' },
            { fieldName: 'lymphocyte', label: 'Lymphocyte', inputType: 'number', unit: '%', referenceRange: '20 - 50' },
            { fieldName: 'monocyte', label: 'Monocyte', inputType: 'number', unit: '%', referenceRange: '2 - 10' },
            { fieldName: 'eosinophil', label: 'Eosinophil', inputType: 'number', unit: '%', referenceRange: '1 - 8' },
            { fieldName: 'basophil', label: 'Basophil', inputType: 'number', unit: '%', referenceRange: '0 - 1' },
            { fieldName: 'platelet', label: 'Platelet', inputType: 'number', unit: 'X 10^9/L', referenceRange: '150 - 400' },
            { fieldName: 'rbc', label: 'RBC', inputType: 'number', unit: 'X 10^12/L', referenceRange: '3.7 - 5.1' },
            { fieldName: 'mchc', label: 'MCHC', inputType: 'number', unit: 'g/dl', referenceRange: '32.2 - 36.2' },
            { fieldName: 'mch', label: 'MCH', inputType: 'number', unit: 'pg', referenceRange: '26.9 - 33.3' },
            { fieldName: 'mcv', label: 'MCV', inputType: 'number', unit: 'fL', referenceRange: '82.6 - 99.1' }
        ]
    },
    {
        testCode: 'COAG',
        testName: 'Coagulation Profile (PT/INR & APTT)',
        category: 'Haematology',
        schemaDefinition: [
            { fieldName: 'ptPatient', label: 'PT of Patient', inputType: 'number', unit: 'seconds', referenceRange: '10 - 14.5' },
            { fieldName: 'ptControl', label: 'PT of Control', inputType: 'number', unit: 'seconds', referenceRange: '10 - 14.5' },
            { fieldName: 'inr', label: 'INR', inputType: 'number', referenceRange: '0.9-1.1 (Healthy), 1.5-2.0 (DVT), 2.5-3.5 (Oral Anticoagulant), 3.0-4.0 (Pulmonary Embolism)' },
            { fieldName: 'apttPatient', label: 'Partial Thromboplastin Time (APTT)', inputType: 'number', unit: 'seconds', referenceRange: '30 - 40' },
            { fieldName: 'apttControl', label: 'PTT Control', inputType: 'number', unit: 'seconds' }
        ]
    },
    {
        testCode: 'BG-GENO',
        testName: 'Blood Group & Genotype',
        category: 'Haematology',
        schemaDefinition: [
            { fieldName: 'bloodGroup', label: 'Blood Group', inputType: 'select', options: ['"O" Rh "D" Positive', '"O" Rh "D" Negative', '"A" Rh "D" Positive', '"A" Rh "D" Negative', '"B" Rh "D" Positive', '"B" Rh "D" Negative', '"AB" Rh "D" Positive', '"AB" Rh "D" Negative'] },
            { fieldName: 'genotype', label: 'Hb Genotype', inputType: 'select', options: ['AA', 'AS', 'SS', 'SC', 'AC'] }
        ]
    },
    {
        testCode: 'ESR',
        testName: 'Erythrocyte Sedimentation Rate (ESR)',
        category: 'Haematology',
        schemaDefinition: [
            { fieldName: 'esr', label: 'ESR', inputType: 'number', unit: 'mm/hr', referenceRange: '0 - 20' }
        ]
    },
    {
        testCode: 'COOMBS',
        testName: 'Coombs Test',
        category: 'Haematology',
        schemaDefinition: [
            { fieldName: 'directCoombs', label: 'Direct Coombs Test', inputType: 'select', options: ['Negative', 'Positive'] },
            { fieldName: 'indirectCoombs', label: 'Indirect Coombs Test', inputType: 'select', options: ['Negative', 'Positive'] }
        ]
    },

    // ==========================================
    // 4. CHEMISTRY
    // ==========================================
    {
        testCode: 'PLASMA-PROT',
        testName: 'Plasma Protein',
        category: 'Chemistry',
        schemaDefinition: [
            { fieldName: 'totalProtein', label: 'Total Protein', inputType: 'number', unit: 'g/dl', referenceRange: '6.0 - 8.4' },
            { fieldName: 'albumin', label: 'Albumin', inputType: 'number', unit: 'g/dl', referenceRange: '3.5 - 5.2' },
            { fieldName: 'globulin', label: 'Globulin', inputType: 'number', unit: 'g/dl', referenceRange: '2.0 - 3.8' },
            { fieldName: 'agRatio', label: 'A/G Ratio', inputType: 'text', referenceRange: 'Normal' }
        ]
    },
    {
        testCode: 'DIABETIC-PROF',
        testName: 'Diabetic Profile',
        category: 'Chemistry',
        schemaDefinition: [
            { fieldName: 'fbs', label: 'Fasting Blood Sugar', inputType: 'number', unit: 'mg/dl', referenceRange: '70 - 120' },
            { fieldName: 'hpp2', label: '2 HPP', inputType: 'number', unit: 'mg/dl', referenceRange: '70 - 140' },
            { fieldName: 'rbs', label: 'Random Blood Sugar', inputType: 'number', unit: 'mg/dl', referenceRange: '70 - 140' },
            { fieldName: 'hba1c', label: 'HBA1C', inputType: 'number', unit: '%', referenceRange: '4.5 - 6.5' },
            { fieldName: 'eAg', label: 'Estimated Average Glucose (eAG)', inputType: 'text', unit: 'mg/dl', referenceRange: 'eAG = (28.7 X HbA1C) - 46.7' }
        ]
    },
    {
        testCode: 'OGTT',
        testName: 'Oral Glucose Tolerance Test (OGTT)',
        category: 'Chemistry',
        schemaDefinition: [
            { fieldName: 'fbs', label: 'Fasting Blood Sugar', inputType: 'number', unit: 'mg/dl', referenceRange: '70 - 120' },
            { fieldName: 'min30', label: '30 Minutes', inputType: 'number', unit: 'mg/dl', referenceRange: '70 - 140' },
            { fieldName: 'min60', label: '60 Minutes', inputType: 'number', unit: 'mg/dl', referenceRange: '70 - 140' },
            { fieldName: 'min90', label: '90 Minutes', inputType: 'number', unit: 'mg/dl', referenceRange: '70 - 140' },
            { fieldName: 'min120', label: '120 Minutes', inputType: 'number', unit: 'mg/dl', referenceRange: '70 - 140' }
        ]
    },
    {
        testCode: 'LFT-EXT',
        testName: 'Liver Profile (Extended)',
        category: 'Chemistry',
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
        testName: 'Lipid Profile (Extended)',
        category: 'Chemistry',
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
        testName: 'Renal Profile (Extended)',
        category: 'Chemistry',
        schemaDefinition: [
            { fieldName: 'na', label: 'Na+', inputType: 'number', unit: 'mmol/L', referenceRange: '135 - 145' },
            { fieldName: 'cl', label: 'Cl-', inputType: 'number', unit: 'mmol/L', referenceRange: '98 - 108' },
            { fieldName: 'k', label: 'K+', inputType: 'number', unit: 'mmol/L', referenceRange: '3.5 - 5.5' },
            { fieldName: 'hco3', label: 'HCO3-', inputType: 'number', unit: 'mmol/L', referenceRange: '21 - 28' },
            { fieldName: 'urea', label: 'Urea', inputType: 'number', unit: 'mg/dl', referenceRange: '10 - 55' },
            { fieldName: 'creatinine', label: 'Creatinine', inputType: 'number', unit: 'mg/dl', referenceRange: '0.6-1.3 (Male), 0.6-1.2 (Female)' },
            { fieldName: 'uricAcid', label: 'Uric Acid', inputType: 'number', unit: 'mg/dl', referenceRange: '2.0-5.0 (Child), 2.5-6.5 (Adult F), 3.5-7.5 (Adult M)' },
            { fieldName: 'calcium', label: 'Calcium', inputType: 'number', unit: 'mg/dl', referenceRange: '11.0-13.0 (Child), 8.6-10.2 (Adult)' },
            { fieldName: 'phosphorus', label: 'Phosphorus', inputType: 'number', unit: 'mg/dl', referenceRange: '2.5 - 4.5' },
            { fieldName: 'egfr', label: 'eGFR (CKD-EPI 2021)', inputType: 'number', unit: 'ml/min/1.73m2', referenceRange: '90-120. (G1: ≥90, G2: 60-89, G3a: 45-59, G3b: 30-44, G4: 15-29, G5: <15)' }
        ]
    },

    // ==========================================
    // 5. IMMUNOASSAY & SPECIALIZED TESTS
    // ==========================================
    {
        testCode: 'HORM-F',
        testName: 'Hormonal Profile (Female) & Thyroid',
        category: 'Immunoassay',
        schemaDefinition: [
            { fieldName: 'lh', label: 'LH', inputType: 'number', unit: 'mIU/ml', referenceRange: '2.1-12.7 (Follicular), 1.0-12.0 (Luteal)' },
            { fieldName: 'fsh', label: 'FSH', inputType: 'number', unit: 'mIU/ml', referenceRange: '2.9-12.0 (Follicular), 1.5-7.0 (Luteal)' },
            { fieldName: 'prolactin', label: 'Prolactin', inputType: 'number', unit: 'ng/ml', referenceRange: '5.0 - 35.0' },
            { fieldName: 'progesterone', label: 'Progesterone', inputType: 'number', unit: 'ng/ml', referenceRange: '0.2-1.4 (Follicular), 4-25 (Luteal)' },
            { fieldName: 'estradiol', label: 'Estradiol', inputType: 'number', unit: 'pg/ml', referenceRange: '10.1-177 (Follicular), 64.8-564 (Ovulation), 42-310 (Luteal)' },
            { fieldName: 'dheas', label: 'D.H.E.A.S', inputType: 'number', unit: 'ug/dl', referenceRange: '33.9-407.0 (Pre-Menopausal), 9.4-256 (Post-Menopausal)' },
            { fieldName: 'testosterone', label: 'Testosterone', inputType: 'number', unit: 'ng/ml', referenceRange: '0.1 - 1.2' },
            { fieldName: 't3', label: 'T3', inputType: 'number', unit: 'nmol/L', referenceRange: '1.23 - 3.08' },
            { fieldName: 't4', label: 'T4', inputType: 'number', unit: 'nmol/L', referenceRange: '57.9 - 150.6' },
            { fieldName: 'tsh', label: 'TSH', inputType: 'number', unit: 'uIU/ml', referenceRange: '0.4 - 5.6' }
        ]
    },
    {
        testCode: 'HORM-M',
        testName: 'Hormonal Profile (Male)',
        category: 'Immunoassay',
        schemaDefinition: [
            { fieldName: 'lh', label: 'LH', inputType: 'number', unit: 'mIU/ml', referenceRange: '1.5 - 9.6' },
            { fieldName: 'fsh', label: 'FSH', inputType: 'number', unit: 'mIU/ml', referenceRange: '1.7 - 12.0' },
            { fieldName: 'prolactin', label: 'Prolactin', inputType: 'number', unit: 'ng/ml', referenceRange: '3.0 - 25.0' },
            { fieldName: 'testosterone', label: 'Testosterone', inputType: 'number', unit: 'ng/ml', referenceRange: '2.0 - 12.0' }
        ]
    },
    {
        testCode: 'TUMOR-MKR',
        testName: 'Tumor Markers',
        category: 'Immunoassay',
        schemaDefinition: [
            { fieldName: 'psa', label: 'PSA', inputType: 'number', unit: 'ng/mL', referenceRange: '0-4 (Normal), 4-10 (Suspicious), >10 (Elevated)' },
            { fieldName: 'cea', label: 'CEA', inputType: 'number', unit: 'ng/ml', referenceRange: '0-5 (Smokers), 0-3 (Non-Smokers)' },
            { fieldName: 'afp', label: 'AFP', inputType: 'number', unit: 'IU/ml', referenceRange: '0 - 7' },
            { fieldName: 'bca153', label: 'BCA 15-3 (Breast)', inputType: 'number', unit: 'U/ml', referenceRange: '0 - 34' },
            { fieldName: 'ca125', label: 'CA-125 (Ovarian)', inputType: 'number', unit: 'U/ml', referenceRange: '0 - 35' }
        ]
    },
    {
        testCode: 'VIRAL-ABS',
        testName: 'Viral & Parasitic Antibodies',
        category: 'Immunoassay',
        schemaDefinition: [
            { fieldName: 'toxoIgg', label: 'TOXO-IgG', inputType: 'number', unit: 'UI/ml', referenceRange: '<4.0 (Neg), 4.0-8.0 (Eqv), ≥8.0 (Pos)' },
            { fieldName: 'toxoIgm', label: 'TOXO-IgM', inputType: 'number', unit: 'UI/ml', referenceRange: '<0.55 (Neg), 0.55-0.65 (Eqv), ≥0.65 (Pos)' },
            { fieldName: 'hsvIgg', label: 'HSV 1&2 IgG', inputType: 'number', unit: 'UI/ml', referenceRange: '<0.80 (Neg), 0.80-0.99 (Eqv), >0.99 (Pos)' },
            { fieldName: 'hsvIgm', label: 'HSV 1&2 IgM', inputType: 'number', unit: 'UI/ml', referenceRange: '<0.80 (Neg), 0.80-0.99 (Eqv), >0.99 (Pos)' },
            { fieldName: 'rubellaIgg', label: 'Rubella IgG', inputType: 'number', unit: 'UI/ml', referenceRange: '<10 (Neg), 10-15 (Eqv), ≥15 (Pos)' },
            { fieldName: 'rubellaIgm', label: 'Rubella IgM', inputType: 'number', unit: 'UI/ml', referenceRange: '<0.80 (Neg), 0.80-1.20 (Eqv), ≥1.20 (Pos)' },
            { fieldName: 'varicellaIgg', label: 'Varicella IgG', inputType: 'number', unit: 'UI/ml', referenceRange: '<0.8 (Neg), 0.8-1.2 (Eqv), >1.2 (Pos)' },
            { fieldName: 'varicellaIgm', label: 'Varicella IgM', inputType: 'number', unit: 'UI/ml', referenceRange: '<0.8 (Neg), 0.8-1.2 (Eqv), >1.2 (Pos)' }
        ]
    },
    {
        testCode: 'AMH',
        testName: 'Anti-Mullerian Hormone (AMH)',
        category: 'Immunoassay',
        schemaDefinition: [
            { fieldName: 'amh', label: 'AMH', inputType: 'number', unit: 'ng/mL', referenceRange: 'M: 0.92-13.89 | F(20-29): 0.88-10.35 | F(30-39): 0.31-7.86' }
        ]
    },
    {
        testCode: 'CARDIAC',
        testName: 'Cardiac Markers',
        category: 'Immunoassay',
        schemaDefinition: [
            { fieldName: 'troponinI', label: 'Troponin I', inputType: 'number', unit: 'ng/ml', referenceRange: '0 - 1.5' },
            { fieldName: 'myoglobin', label: 'Myoglobin', inputType: 'number', unit: 'ng/ml', referenceRange: '0 - 70' }
        ]
    },
    {
        testCode: 'HSCRP',
        testName: 'HsCRP (C-Reactive Protein)',
        category: 'Immunoassay',
        schemaDefinition: [
            { fieldName: 'crp', label: 'CRP', inputType: 'number', unit: 'Mg/L', referenceRange: '<1.0 (Low), 1.0-3.0 (Avg), >3.0 (High)' }
        ]
    },
    {
        testCode: 'MISC-IMMUNO',
        testName: 'Misc Immunoassay (IgE, D-Dimer, Beta HCG, G6PD)',
        category: 'Immunoassay',
        schemaDefinition: [
            { fieldName: 'ige', label: 'IgE', inputType: 'number', unit: 'IU/ml', referenceRange: '5 - 1000' },
            { fieldName: 'ddimer', label: 'D-DIMER', inputType: 'number', unit: 'ng/ml', referenceRange: '0 - 500' },
            { fieldName: 'betahcg', label: 'BETA HCG', inputType: 'number', unit: 'mIU/ml', referenceRange: '0 - 10' },
            { fieldName: 'g6pd', label: 'G6PD', inputType: 'number', unit: 'mU/10^9 Erythrocyte', referenceRange: '245 - 299' }
        ]
    },
    {
        testCode: 'HPV-SWAB',
        testName: 'Human Papilloma Virus (HPV) - Swab',
        category: 'Immunoassay',
        schemaDefinition: [
            { fieldName: 'hpvResult', label: 'HPV Result', inputType: 'text', referenceRange: 'Negative' }
        ]
    },

    // ==========================================
    // 6. MICROBIOLOGY
    // ==========================================
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
            { fieldName: 'appearance', label: 'Appearance', inputType: 'text' },
            { fieldName: 'colour', label: 'Colour', inputType: 'text' },
            { fieldName: 'pusCells', label: 'Pus Cells (/HPF)', inputType: 'text' },
            { fieldName: 'epithelialCells', label: 'Epithelial Cells (/HPF)', inputType: 'text' },
            { fieldName: 'yeastCells', label: 'Yeast Cells', inputType: 'text', referenceRange: 'Nil' },
            { fieldName: 'crystals', label: 'Crystals', inputType: 'text', referenceRange: 'Nil' },
            { fieldName: 'casts', label: 'Casts', inputType: 'text', referenceRange: 'Nil' },
            { fieldName: 'culture', label: 'Culture Yield', inputType: 'text' },
            { fieldName: 'sensitiveHigh', label: 'Sensitivity (+++)', inputType: 'text' },
            { fieldName: 'sensitiveMed', label: 'Sensitivity (++)', inputType: 'text' },
            { fieldName: 'sensitiveLow', label: 'Sensitivity (+)', inputType: 'text' },
            { fieldName: 'resistance', label: 'Resistance', inputType: 'text' }
        ]
    },
    {
        testCode: 'STOOL-MCS',
        testName: 'Stool M/C/S',
        category: 'Microbiology',
        schemaDefinition: [
            { fieldName: 'macroscopy', label: 'Macroscopy', inputType: 'text', referenceRange: 'Brownish formed, no mucus, no blood' },
            { fieldName: 'microscopy', label: 'Microscopy', inputType: 'text', referenceRange: 'No cyst or ova of parasite seen' },
            { fieldName: 'culture', label: 'Culture Yield', inputType: 'text', referenceRange: 'No enteric pathogenic organism isolated' },
            { fieldName: 'sensitiveHigh', label: 'Sensitivity (+++)', inputType: 'text' },
            { fieldName: 'sensitiveMed', label: 'Sensitivity (++)', inputType: 'text' },
            { fieldName: 'sensitiveLow', label: 'Sensitivity (+)', inputType: 'text' },
            { fieldName: 'resistance', label: 'Resistance', inputType: 'text' }
        ]
    },
    {
        testCode: 'HVS-MCS',
        testName: 'HVS M/C/S (High Vaginal Swab)',
        category: 'Microbiology',
        schemaDefinition: [
            { fieldName: 'pusCells', label: 'Pus Cells (/HPF)', inputType: 'text' },
            { fieldName: 'epithelialCells', label: 'Epithelial Cells (/HPF)', inputType: 'text' },
            { fieldName: 'yeastCells', label: 'Yeast Cells', inputType: 'text', referenceRange: 'Nil' },
            { fieldName: 'tVaginalis', label: 'T. vaginalis', inputType: 'text', referenceRange: 'Nil' },
            { fieldName: 'culture', label: 'Culture Yield', inputType: 'text' },
            { fieldName: 'sensitiveHigh', label: 'Sensitivity (+++)', inputType: 'text' },
            { fieldName: 'sensitiveMed', label: 'Sensitivity (++)', inputType: 'text' },
            { fieldName: 'sensitiveLow', label: 'Sensitivity (+)', inputType: 'text' },
            { fieldName: 'resistance', label: 'Resistance', inputType: 'text' }
        ]
    },
    {
        testCode: 'SWAB-MCS-GENERIC',
        testName: 'Swab M/C/S (Wound, Nasal, Urethral, Endocervical, Sputum)',
        category: 'Microbiology',
        schemaDefinition: [
            { fieldName: 'macroscopy', label: 'Macroscopy (Optional)', inputType: 'text' },
            { fieldName: 'gramStain', label: 'Microscopy (Gram Stain)', inputType: 'text' },
            { fieldName: 'culture', label: 'Culture Yield', inputType: 'text' },
            { fieldName: 'sensitiveHigh', label: 'Sensitivity (+++)', inputType: 'text' },
            { fieldName: 'sensitiveMed', label: 'Sensitivity (++)', inputType: 'text' },
            { fieldName: 'sensitiveLow', label: 'Sensitivity (+)', inputType: 'text' },
            { fieldName: 'resistance', label: 'Resistance', inputType: 'text' }
        ]
    },
    {
        testCode: 'SFA',
        testName: 'Seminal Fluid Analysis (SFA)',
        category: 'Microbiology',
        schemaDefinition: [
            { fieldName: 'timeProduced', label: 'Time Produced', inputType: 'text' },
            { fieldName: 'timeReceived', label: 'Time Received', inputType: 'text' },
            { fieldName: 'timeAnalysed', label: 'Time Analysed', inputType: 'text' },
            { fieldName: 'abstinence', label: 'Period of Abstinence (Days)', inputType: 'text' },
            { fieldName: 'colour', label: 'Colour', inputType: 'text' },
            { fieldName: 'volume', label: 'Volume', inputType: 'number', unit: 'ml', referenceRange: '≥ 1.5' },
            { fieldName: 'consistency', label: 'Consistency', inputType: 'text' },
            { fieldName: 'liquefaction', label: 'Liquefaction', inputType: 'text' },
            { fieldName: 'ph', label: 'PH', inputType: 'number', referenceRange: '≥ 7.2' },
            { fieldName: 'normalForm', label: 'Normal Form', inputType: 'number', unit: '%' },
            { fieldName: 'abnormalForm', label: 'Abnormal Form', inputType: 'number', unit: '%' },
            { fieldName: 'progMotility', label: 'Progressive Motility (PR)', inputType: 'number', unit: '%' },
            { fieldName: 'nonProgMotility', label: 'Non-Progressive (NP)', inputType: 'number', unit: '%' },
            { fieldName: 'immotile', label: 'Immotile (IM)', inputType: 'number', unit: '%' },
            { fieldName: 'totalMotility', label: 'Total Motility (PR + NP)', inputType: 'number', unit: '%', referenceRange: '≥ 40%' },
            { fieldName: 'pusCells', label: 'Pus Cells (/HPF)', inputType: 'text', referenceRange: '0 - 2' },
            { fieldName: 'spermatocytes', label: 'Spermatocytes (Round Cells)', inputType: 'text', referenceRange: 'Nil' },
            { fieldName: 'epithelialCell', label: 'Epithelial Cell (/HPF)', inputType: 'text' },
            { fieldName: 'rbc', label: 'RBC', inputType: 'text' },
            { fieldName: 'yeastCell', label: 'Yeast Cell', inputType: 'text', referenceRange: 'Nil' },
            { fieldName: 'agglutination', label: 'Sperm Agglutination', inputType: 'select', options: ['Absent', 'Present'] },
            { fieldName: 'spermConcentration', label: 'Sperm Concentration', inputType: 'number', unit: 'x 10^6 cells/ml', referenceRange: '≥ 15' },
            { fieldName: 'totalCount', label: 'Total Count', inputType: 'number', unit: 'x 10^6 / Ejaculate', referenceRange: '≥ 39' },
            { fieldName: 'culture', label: 'Culture Yield', inputType: 'text' }
        ]
    },
    {
        testCode: 'SKIN-SCRAPING',
        testName: 'Skin Scraping (Microscopy)',
        category: 'Microbiology',
        schemaDefinition: [
            { fieldName: 'microscopy', label: 'Microscopy Result', inputType: 'text', referenceRange: 'No adult Sarcoptes scabiei or eggs seen' }
        ]
    },
    {
        testCode: 'MICROFILARIA',
        testName: 'Microfilaria Screen',
        category: 'Microbiology',
        schemaDefinition: [
            { fieldName: 'microfilaria', label: 'Microfilaria Result', inputType: 'text', referenceRange: 'No microfilaria seen' }
        ]
    },
    {
        testCode: 'BLOOD-CULTURE',
        testName: 'Blood Culture',
        category: 'Microbiology',
        schemaDefinition: [
            { fieldName: 'culture', label: 'Blood Culture Result', inputType: 'text', referenceRange: 'Yielded no growth after 7 days of incubation' }
        ]
    },
    {
        testCode: 'MANTOUX',
        testName: 'Mantoux Test',
        category: 'Microbiology',
        schemaDefinition: [
            { fieldName: 'dateInoculation', label: 'Date of Inoculation', inputType: 'text' },
            { fieldName: 'timeInoculation', label: 'Time of Inoculation', inputType: 'text' },
            { fieldName: 'dateExam', label: 'Date of Examination', inputType: 'text' },
            { fieldName: 'timeExam', label: 'Time of Examination', inputType: 'text' },
            { fieldName: 'induration', label: 'Result (Induration)', inputType: 'number', unit: 'mm', referenceRange: '< 10mm (Normal)' }
        ]
    },
    {
        testCode: 'AFB-SPUTUM',
        testName: 'AFB Sputum (Tuberculosis Screen)',
        category: 'Microbiology',
        schemaDefinition: [
            { fieldName: 'macroscopy', label: 'Macroscopy', inputType: 'text' },
            { fieldName: 'afb1', label: 'AFB X1', inputType: 'text', referenceRange: 'No AFB seen' },
            { fieldName: 'afb2', label: 'AFB X2', inputType: 'text', referenceRange: 'No AFB seen' },
            { fieldName: 'afb3', label: 'AFB X3', inputType: 'text', referenceRange: 'No AFB seen' }
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
        console.log(`✅ Successfully seeded ${templates.length} Dynamic Templates into the database!`);

        process.exit();
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();