/*
  # Seed Initial Questions for Each Discipline

  1. Purpose
    - Populate the questions table with 2 questions per discipline
    - Each question includes: question_text, claim, answer_paragraph, and consensus_score
    - All questions are approved and ready to receive citations

  2. Disciplines Covered
    - Climate Science (2 questions)
    - Medicine (2 questions)
    - Cosmology (2 questions)
    - Biology (2 questions)
    - Physics (2 questions)
    - Mathematics (2 questions)
    - Geology (2 questions)

  3. Question Fields
    - question_text: The scientific question being asked
    - claim: A concise 1-sentence scientific claim
    - answer_paragraph: Detailed explanation of the scientific consensus
    - consensus_score: 8-10 (high consensus on established science)
    - is_approved: true (visible to public)
    - is_complete: false (needs citations to be added)
*/

-- Climate Science Questions
INSERT INTO questions (discipline, question_text, claim, answer_paragraph, consensus_score, is_approved, is_complete)
VALUES 
(
  'climate_science',
  'Is human activity the primary cause of recent global warming?',
  'Human activities, particularly the emission of greenhouse gases, are the dominant cause of observed warming since the mid-20th century.',
  'The scientific consensus is overwhelming that human activities are the primary driver of recent global warming. Multiple lines of evidence support this conclusion: atmospheric CO2 concentrations have increased from about 280 parts per million before the Industrial Revolution to over 410 ppm today, with isotopic signatures confirming fossil fuel origins. This increase correlates strongly with rising global temperatures, with the past decade being the warmest on record. Climate models that include human influences accurately reproduce observed warming patterns, while models with only natural factors do not. The Intergovernmental Panel on Climate Change (IPCC) has stated with very high confidence that human influence is the dominant cause of warming since 1950.',
  10,
  true,
  false
),
(
  'climate_science',
  'Will sea levels continue to rise throughout the 21st century?',
  'Global sea levels are projected to continue rising throughout the 21st century due to thermal expansion and ice sheet melting.',
  'Scientific evidence strongly indicates that sea levels will continue to rise through the 21st century and beyond. Current observations show sea levels rising at approximately 3.3 millimeters per year, with the rate accelerating. This rise is driven by two primary mechanisms: thermal expansion of warming ocean water and the melting of land-based ice from glaciers and ice sheets in Greenland and Antarctica. Even if greenhouse gas emissions were immediately halted, committed warming from past emissions would continue to drive sea level rise for decades. Under current emission trajectories, projections suggest global mean sea level could rise by 0.5 to 1 meter by 2100, with some scenarios suggesting even higher rises if ice sheet dynamics accelerate unexpectedly.',
  9,
  true,
  false
);

-- Medicine Questions
INSERT INTO questions (discipline, question_text, claim, answer_paragraph, consensus_score, is_approved, is_complete)
VALUES 
(
  'medicine',
  'Are vaccines safe and effective at preventing infectious diseases?',
  'Vaccines are among the safest and most effective public health interventions, preventing millions of deaths annually from infectious diseases.',
  'Vaccines have an extensive safety record supported by decades of research and billions of doses administered worldwide. Before approval, vaccines undergo rigorous testing in multiple phases of clinical trials involving thousands of participants. Post-approval surveillance systems continuously monitor for adverse events. While minor side effects like soreness or low-grade fever are common, serious adverse events are extremely rare. The benefits of vaccination far outweigh the risks: vaccines have eradicated smallpox, nearly eliminated polio, and dramatically reduced deaths from measles, tetanus, and other diseases. The World Health Organization estimates that vaccines prevent 2-3 million deaths annually. The scientific evidence demonstrates that vaccines are both safe and highly effective at preventing infectious diseases.',
  10,
  true,
  false
),
(
  'medicine',
  'Does smoking tobacco cause cancer and other serious health conditions?',
  'Tobacco smoking is causally linked to multiple types of cancer, cardiovascular disease, and respiratory illnesses, making it a leading preventable cause of death.',
  'The causal relationship between smoking and serious health conditions is one of the most thoroughly documented findings in medical science. Epidemiological studies spanning decades, involving millions of participants, consistently demonstrate that smokers have dramatically higher rates of lung cancer, with about 85% of lung cancer cases attributable to smoking. Beyond lung cancer, smoking causes cancers of the mouth, throat, esophagus, pancreas, bladder, and other organs. Tobacco smoke contains over 7,000 chemicals, including at least 70 known carcinogens. Smoking also increases risk of heart disease, stroke, chronic obstructive pulmonary disease (COPD), and numerous other conditions. The biological mechanisms are well understood, including DNA damage from carcinogens and chronic inflammation. Public health initiatives to reduce smoking have led to measurable decreases in smoking-related diseases, further confirming the causal relationship.',
  10,
  true,
  false
);

-- Cosmology Questions
INSERT INTO questions (discipline, question_text, claim, answer_paragraph, consensus_score, is_approved, is_complete)
VALUES 
(
  'cosmology',
  'Did the universe begin with a Big Bang approximately 13.8 billion years ago?',
  'The universe began in a hot, dense state approximately 13.8 billion years ago and has been expanding ever since, as described by Big Bang cosmology.',
  'The Big Bang theory is supported by multiple independent lines of observational evidence. The expansion of the universe, first observed by Edwin Hubble in 1929, shows that galaxies are moving away from each other, suggesting the universe was once much smaller and denser. The cosmic microwave background (CMB) radiation, discovered in 1964, is thermal radiation left over from when the universe was about 380,000 years old, providing a snapshot of the early universe. The abundance of light elements (hydrogen, helium, and lithium) matches predictions from Big Bang nucleosynthesis. Measurements from various sources, including CMB observations from satellites like WMAP and Planck, consistently place the age of the universe at approximately 13.8 billion years. While questions remain about the earliest moments and what preceded the Big Bang, the overall framework is strongly supported.',
  9,
  true,
  false
),
(
  'cosmology',
  'Is dark matter a real component of the universe?',
  'Dark matter constitutes approximately 85% of the matter in the universe and is essential to explaining galactic structure and cosmic evolution.',
  'Multiple independent observations provide strong evidence for dark matter, an invisible form of matter that interacts primarily through gravity. Galactic rotation curves show that stars in outer regions of galaxies move faster than can be explained by visible matter alone, requiring additional mass. Gravitational lensing observations show that massive galaxy clusters bend light from background objects more than their visible mass predicts. The cosmic microwave background radiation patterns require dark matter for accurate modeling. Large-scale structure formation simulations only match observations when dark matter is included. The Bullet Cluster observation provided direct evidence by showing gravitationally lensed mass separated from visible matter after a galactic collision. While the particle nature of dark matter remains unknown despite extensive searches, the gravitational evidence for its existence is compelling and consistent across multiple independent measurement methods.',
  9,
  true,
  false
);

-- Biology Questions
INSERT INTO questions (discipline, question_text, claim, answer_paragraph, consensus_score, is_approved, is_complete)
VALUES 
(
  'biology',
  'Is evolution by natural selection the fundamental mechanism explaining the diversity of life?',
  'Evolution by natural selection is the unifying theory of biology, explaining how species change over time and how the diversity of life arose from common ancestors.',
  'Evolution by natural selection is supported by overwhelming evidence from multiple scientific disciplines. The fossil record documents transitional forms and the progression of life from simple to complex organisms over billions of years. Comparative anatomy reveals homologous structures across species, indicating common ancestry. DNA sequencing shows that all life shares the same genetic code and that genetic similarities align with evolutionary predictions. Direct observations of evolution include antibiotic resistance in bacteria, industrial melanism in peppered moths, and adaptive radiation in island species. Biogeography shows distribution patterns consistent with evolution and continental drift. Laboratory experiments demonstrate that natural selection can produce rapid evolutionary change. The theory successfully predicts discoveries in paleontology, genetics, and developmental biology. Evolution is the foundation of modern biology and is accepted by the scientific community as fact.',
  10,
  true,
  false
),
(
  'biology',
  'Is DNA the molecule that carries genetic information in nearly all living organisms?',
  'DNA (deoxyribonucleic acid) serves as the hereditary material in all cellular organisms and most viruses, encoding instructions for biological development and function.',
  'DNA as the carrier of genetic information is one of the most fundamental established facts in biology. The structure of DNA, elucidated by Watson and Crick in 1953, reveals how it stores information in sequences of nucleotide base pairs and how it can replicate. Experiments by Avery, MacLeod, and McCarty (1944) and by Hershey and Chase (1952) definitively demonstrated that DNA, not protein, is the genetic material. DNA contains genes that encode proteins through the processes of transcription and translation. The genetic code is nearly universal across all life forms, supporting common ancestry. DNA mutations are the source of genetic variation that drives evolution. Modern biotechnology, from genetic engineering to forensic analysis, relies on our understanding of DNA. The Human Genome Project and subsequent genomic studies have mapped entire genomes, confirming DNA''s role. Only some RNA viruses use RNA as their primary genetic material.',
  10,
  true,
  false
);

-- Physics Questions
INSERT INTO questions (discipline, question_text, claim, answer_paragraph, consensus_score, is_approved, is_complete)
VALUES 
(
  'physics',
  'Is the speed of light in vacuum constant and the maximum speed at which information can travel?',
  'The speed of light in vacuum is a fundamental constant (approximately 299,792,458 meters per second) and represents the maximum speed for energy, matter, and information transmission.',
  'The constancy of the speed of light is a cornerstone of modern physics, extensively verified through experiment and fundamental to Einstein''s theory of special relativity. Michelson-Morley experiments in the 1880s showed that light speed is independent of the motion of the source or observer. Special relativity, published in 1905, proposed that the speed of light is the same in all inertial reference frames, leading to phenomena like time dilation and length contraction that have been experimentally confirmed. Particle accelerators consistently show that no matter how much energy is added, particles with mass approach but never reach light speed. GPS satellites must account for relativistic effects to maintain accuracy. Causality requires a maximum information speed; otherwise, cause and effect could be violated. While quantum entanglement involves correlations, it cannot transmit information faster than light. The constancy of light speed has been verified to extreme precision.',
  10,
  true,
  false
),
(
  'physics',
  'Does quantum mechanics accurately describe the behavior of matter and energy at atomic and subatomic scales?',
  'Quantum mechanics is the fundamental theory governing atomic and subatomic phenomena, verified by countless experiments and underlying modern technology.',
  'Quantum mechanics has been tested more extensively than perhaps any other scientific theory and has never failed an experimental test. It successfully explains atomic structure, chemical bonding, the behavior of semiconductors, superconductivity, and nuclear processes. Experiments confirm quantum predictions including wave-particle duality, demonstrated in double-slit experiments with electrons and even molecules; quantum tunneling, essential to nuclear fusion in stars and modern electronics; and quantum entanglement, verified in Bell test experiments. Technologies based on quantum mechanics include lasers, transistors, MRI machines, and atomic clocks. Quantum electrodynamics, a quantum field theory, predicts the electron magnetic moment to 12 decimal places. While interpretation of quantum mechanics remains debated (Copenhagen, many-worlds, etc.), the mathematical framework and its predictions are unambiguous and universally accepted in physics.',
  10,
  true,
  false
);

-- Mathematics Questions
INSERT INTO questions (discipline, question_text, claim, answer_paragraph, consensus_score, is_approved, is_complete)
VALUES 
(
  'mathematics',
  'Has Fermat''s Last Theorem been proven?',
  'Fermat''s Last Theorem, which states that no three positive integers satisfy x^n + y^n = z^n for any integer n > 2, was proven by Andrew Wiles in 1995.',
  'Fermat''s Last Theorem, first conjectured by Pierre de Fermat in 1637, remained one of mathematics'' most famous unsolved problems for over 350 years. Andrew Wiles, working largely in secret for seven years, announced a proof in 1993. After a gap was discovered, Wiles worked with Richard Taylor to complete a corrected proof published in 1995. The proof is highly sophisticated, using tools from algebraic geometry and number theory that did not exist in Fermat''s time, particularly the modularity theorem for semistable elliptic curves. The proof connects elliptic curves to modular forms, establishing that certain types of elliptic curves are modular, which implies Fermat''s Last Theorem as a consequence. The proof has been thoroughly reviewed by the mathematical community and is accepted as correct. It represents a triumph of modern mathematics and has opened new research directions.',
  10,
  true,
  false
),
(
  'mathematics',
  'Is the Pythagorean theorem valid for all right triangles?',
  'The Pythagorean theorem, stating that a² + b² = c² for right triangles where c is the hypotenuse, is mathematically proven and universally valid in Euclidean geometry.',
  'The Pythagorean theorem is one of the most fundamental and well-established theorems in mathematics, with hundreds of known proofs using different mathematical approaches. The theorem can be proven using geometric dissection, algebraic methods, similarity arguments, and calculus-based approaches. Ancient civilizations knew the relationship, with the earliest known proof appearing in Euclid''s Elements around 300 BCE. The theorem is not merely an approximation but an exact mathematical truth that follows necessarily from the axioms of Euclidean geometry. It has countless applications in mathematics, physics, engineering, and everyday problem-solving, from calculating distances to designing buildings. While the theorem specifically applies to Euclidean (flat) geometry, analogous relationships exist in non-Euclidean geometries. The theorem''s converse is also true: if a² + b² = c² for a triangle, it must be a right triangle. No exception to the Pythagorean theorem has ever been found in Euclidean space.',
  10,
  true,
  false
);

-- Geology Questions
INSERT INTO questions (discipline, question_text, claim, answer_paragraph, consensus_score, is_approved, is_complete)
VALUES 
(
  'geology',
  'Is plate tectonics the fundamental theory explaining Earth''s geological features and processes?',
  'Plate tectonics describes how Earth''s lithosphere is divided into plates that move over the asthenosphere, driving continental drift, earthquakes, volcanism, and mountain building.',
  'Plate tectonics is the unifying theory of geology, synthesizing and explaining a vast array of geological phenomena. The theory emerged from continental drift hypothesis and seafloor spreading evidence in the 1960s. Key supporting evidence includes: matching geological formations and fossils across continents now separated by oceans; seafloor age patterns showing youngest crust at mid-ocean ridges and progressively older crust toward continents; magnetic striping on the ocean floor recording reversals in Earth''s magnetic field; distribution of earthquakes and volcanoes along plate boundaries; direct GPS measurements showing plates moving at rates of centimeters per year; and deep ocean trenches where plates subduct. The theory explains why mountains form (plate collision), why earthquakes occur where they do (plate boundaries), and the Wilson cycle of ocean basin opening and closing. Plate tectonics is fundamental to understanding Earth''s history and predicting geological hazards.',
  10,
  true,
  false
),
(
  'geology',
  'Is Earth approximately 4.5 billion years old?',
  'Multiple independent radiometric dating methods consistently show that Earth formed approximately 4.54 billion years ago.',
  'The age of Earth has been determined with high precision using radiometric dating of rocks and meteorites. The oldest Earth rocks found are approximately 4 billion years old, but Earth must be older since its surface has been reshaped by plate tectonics. Meteorites, representing unmodified material from the early solar system, consistently date to about 4.54-4.58 billion years using multiple isotope systems including uranium-lead, rubidium-strontium, and samarium-neodymium dating. Moon rocks returned by Apollo missions date to about 4.5 billion years, consistent with the Giant Impact hypothesis of lunar formation. These independent methods, based on different radioactive decay systems with different half-lives, all converge on the same age. Radiometric dating is based on well-understood nuclear physics. Tree rings, ice cores, and other dating methods verify radiometric techniques for younger materials. The 4.5 billion year age is accepted throughout the scientific community.',
  10,
  true,
  false
);