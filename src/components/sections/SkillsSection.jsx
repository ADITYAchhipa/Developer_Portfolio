import ScrollReveal from '../ScrollReveal';
import styles from './SkillsSection.module.css';

const CATEGORY_ORDER = [
  'Languages',
  'Frameworks/Libraries',
  'Databases',
  'DevOps/Cloud',
  'Tools',
];

const CATEGORY_EMOJIS = {
  'Languages': '⚡',
  'Frameworks/Libraries': '🧩',
  'Databases': '🗄️',
  'DevOps/Cloud': '☁️',
  'Tools': '🛠️',
};

function groupByCategory(skills) {
  const groups = {};
  for (const skill of skills) {
    const category = skill.category || 'Other';
    if (!groups[category]) groups[category] = [];
    groups[category].push(skill);
  }
  return groups;
}

function SkillsSection({ data = [] }) {
  const grouped = groupByCategory(data);
  const sortedCategories = CATEGORY_ORDER.filter(
    (cat) => grouped[cat] && grouped[cat].length > 0
  );
  const remaining = Object.keys(grouped).filter(
    (cat) => !CATEGORY_ORDER.includes(cat)
  );
  const allCategories = [...sortedCategories, ...remaining];

  return (
    <section id="skills" className={styles.skills} aria-label="Skills">
      <div className={styles.container}>
        <ScrollReveal animation="fadeLeft" duration={600}>
          <div className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>Skills</span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fadeUp" delay={100}>
          <h2 className={styles.heading}>
            My <span className={styles.highlight}>toolkit</span>
          </h2>
        </ScrollReveal>

        {/* Scrolling marquee */}
        <ScrollReveal animation="fadeIn" delay={200}>
          <div className={styles.marqueeWrap} aria-hidden="true">
            <div className={styles.marquee}>
              {data.concat(data).map((skill, i) => (
                <span key={i} className={styles.marqueeItem}>{skill.name}</span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Category cards */}
        <div className={styles.groups}>
          {allCategories.map((category, index) => (
            <ScrollReveal key={category} animation="fadeUp" delay={index * 120}>
              <div className={styles.group}>
                <div className={styles.groupHeader}>
                  <span className={styles.groupEmoji}>
                    {CATEGORY_EMOJIS[category] || '📦'}
                  </span>
                  <h3 className={styles.categoryHeading}>{category}</h3>
                </div>
                <ul className={styles.badges} aria-label={`${category} skills`}>
                  {grouped[category].map((skill, i) => (
                    <li key={i} className={styles.badge}>
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
