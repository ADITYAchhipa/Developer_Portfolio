import styles from './SkillsSection.module.css';

const CATEGORY_ORDER = [
  'Languages',
  'Frameworks/Libraries',
  'Databases',
  'DevOps/Cloud',
  'Tools',
];

function groupByCategory(skills) {
  const groups = {};
  for (const skill of skills) {
    const category = skill.category || 'Other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(skill);
  }
  return groups;
}

function SkillsSection({ data = [] }) {
  const grouped = groupByCategory(data);

  const sortedCategories = CATEGORY_ORDER.filter(
    (cat) => grouped[cat] && grouped[cat].length > 0
  );

  // Include any categories not in the predefined order
  const remaining = Object.keys(grouped).filter(
    (cat) => !CATEGORY_ORDER.includes(cat)
  );

  const allCategories = [...sortedCategories, ...remaining];

  return (
    <section id="skills" className={styles.skills} aria-label="Skills">
      <div className={styles.container}>
        <h2 className={styles.heading}>Skills</h2>

        <div className={styles.groups}>
          {allCategories.map((category) => (
            <div key={category} className={styles.group}>
              <h3 className={styles.categoryHeading}>{category}</h3>
              <ul className={styles.badges} aria-label={`${category} skills`}>
                {grouped[category].map((skill, index) => (
                  <li key={index} className={styles.badge}>
                    {skill.icon && (
                      <span className={styles.icon} aria-hidden="true">
                        {skill.icon}
                      </span>
                    )}
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
