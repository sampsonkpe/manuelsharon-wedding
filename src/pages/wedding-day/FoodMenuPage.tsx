
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  UtensilsCrossed,
  CakeSlice,
  Soup,
  Salad,
  Fish,
  Flame,
  CookingPot,
  Wheat,
  ChefHat,
  ChevronDown,
} from "lucide-react"

import {
  cinematicAnimate,
  cinematicInitial,
  cinematicTransition,
  luxuryEase,
  staggerSmall,
} from "../../components/motion/motion"

type MenuSection = {
  title: string
  items: string[]
  icon: typeof UtensilsCrossed
  featured?: boolean
}

const menuSections: MenuSection[] = [
  { title: "Starters",
    icon: UtensilsCrossed,
    items: ["Mini pizza", "Kosua ne meko", "Skewed fruits"],
  },
  {
    title: "Dessert Spread",
    icon: CakeSlice,
    items: [
      "Brownies",
      "Cup ice-cream",
      "Fruit salad",
      "Tigernut pudding",
      "Nkate cake",
    ],
  },
  {
    title: "Rice Meals",
    icon: CookingPot,
    items: [
      "Assorted jollof",
      "Fried rice",
      "Vermicelli rice / waakye",
      "Vegetable pasta stir fry",
    ],
  },
  {
    title: "Local Meals",
    icon: Soup,
    items: [
      "Beans stew with fried plantain",
      "Fufu with light soup & goat meat",
      "Gari fotor and all accessories",
      "Banku with okra stew",
    ],
  },
  {
    title: "Salad",
    icon: Salad,
    items: ["Ghanaian salad with assorted dressing"],
    featured: true,
  },
  {
    title: "Pork Show",
    icon: Flame,
    items: [],
    featured: true,
  },
  {
    title: "Side Proteins",
    icon: Fish,
    items: [
      "Whole baked Atlantic fish in butter and herbs",
      "Beef and chicken skewers with chopped onions",
    ],
  },
  {
    title: "Side Sauces",
    icon: CookingPot,
    items: [
      "Chicken chops in vegetable sauce",
      "Spicy seafood sauce",
      "Green chili",
      "Spicy shito",
      "Sweet chili",
      "Tomato gravy",
    ],
  },
  {
    title: "Side Meals",
    icon: Wheat,
    items: [
      "Spiced kelewele",
      "Yam balls",
      "Fried koliko with tsofi, pepper and salsa",
    ],
  },
]

const menuViewport = {
  once: true,
  amount: 0.12,
  margin: "-5% 0px -5% 0px",
}

const nameInitial = {
  opacity: 0,
  scale: 0.985,
  filter: "blur(3px)",
}

const nameAnimate = {
  opacity: 1,
  scale: 1,
  filter: "blur(0px)",
}

const nameTransition = {
  duration: 0.9,
  ease: luxuryEase,
}

export default function FoodMenuPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (title: string) => {
    setExpandedSections((current) =>
      current.includes(title)
        ? current.filter((section) => section !== title)
        : [...current, title],
    )
  }

  return (
    <main className="min-h-screen bg-transparent">
      <div
        className="
          relative
          z-20
          mx-auto
          w-full
          max-w-[1000px]
          px-[var(--page-padding)]
          py-20
          sm:py-28
        "
      >
        {/* HEADER */}

        <motion.header
          initial={cinematicInitial}
          animate={cinematicAnimate}
          transition={cinematicTransition}
          className="text-center"
        >
          <p
            className="
              font-body
              text-sm
              font-medium
              uppercase
              tracking-[0.2em]
              text-[var(--color-muted)]
              sm:text-base
            "
          >
            The Wedding of
          </p>

          {/* COUPLE'S NAMES */}

          <div
            className="
              relative
              mt-8
              flex
              w-full
              justify-center
              overflow-visible
              px-4
              sm:px-12
            "
          >
            <h1
              className="
                flex
                w-full
                flex-col
                items-center
                justify-center
                overflow-visible
                text-center
                text-[var(--color-espresso)]
              "
            >
              <motion.span
                initial={nameInitial}
                animate={nameAnimate}
                transition={{
                  ...nameTransition,
                  delay: staggerSmall,
                }}
                className="
                  inline-block
                  overflow-visible
                  px-[0.18em]
                  font-display
                  text-[clamp(5rem,21vw,10rem)]
                  leading-none
                  whitespace-nowrap
                "
              >
                Manuel
              </motion.span>

              <motion.span
                initial={nameInitial}
                animate={nameAnimate}
                transition={{
                  ...nameTransition,
                  delay: staggerSmall * 2,
                }}
                aria-hidden="true"
                className="
                  inline-block
                  overflow-visible
                  font-display
                  text-[clamp(2.1rem,8.8vw,4.2rem)]
                  leading-none
                "
              >
                &amp;
              </motion.span>

              <motion.span
                initial={nameInitial}
                animate={nameAnimate}
                transition={{
                  ...nameTransition,
                  delay: staggerSmall * 3,
                }}
                className="
                  inline-block
                  overflow-visible
                  px-[0.18em]
                  font-display
                  text-[clamp(5rem,21vw,10rem)]
                  leading-none
                  whitespace-nowrap
                "
              >
                Sharon
              </motion.span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              duration: 1,
              delay: 0.8,
              ease: luxuryEase,
            }}
            className="
              mx-auto
              mt-8
              h-px
              w-8
              origin-center
              bg-[var(--color-caramel)]
            "
          />

          <motion.p
            initial={cinematicInitial}
            animate={cinematicAnimate}
            transition={{
              ...cinematicTransition,
              delay: 1,
            }}
            className="
              mt-8
              font-body
              text-sm
              font-medium
              uppercase
              tracking-[0.24em]
              text-[var(--color-espresso)]
              sm:text-base
            "
          >
            Menu
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1.15,
              ease: luxuryEase,
            }}
            className="
              mx-auto
              mt-4
              max-w-md
              font-editorial
              text-lg
              italic
              leading-relaxed
              text-[var(--color-muted)]
              sm:text-xl
            "
          >
            A selection of dishes prepared for your enjoyment.
          </motion.p>
        </motion.header>

        {/* EXPANDABLE MENU SECTIONS */}

        <section
          aria-label="Wedding reception menu"
          className="
            mt-16
            grid
            grid-cols-1
            gap-4
            sm:mt-24
            sm:grid-cols-2
            sm:gap-6
          "
        >
          {menuSections.map((section, index) => {
            const SectionIcon = section.icon
            const isExpanded = expandedSections.includes(section.title)
            const panelId = `menu-panel-${index}`

            return (
              <motion.article
                key={section.title}
                initial={cinematicInitial}
                whileInView={cinematicAnimate}
                viewport={menuViewport}
                transition={{
                  ...cinematicTransition,
                  delay: (index % 2) * 0.08,
                }}
                className={`
                  relative
                  self-start
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[var(--color-border)]
                  text-center
                  ${
                    section.featured
                      ? "sm:col-span-2"
                      : ""
                  }
                `}
              >
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() => toggleSection(section.title)}
                  className="
                    group
                    flex
                    w-full
                    flex-col
                    items-center
                    px-6
                    py-7
                    text-center
                    transition-colors
                    duration-500
                    hover:bg-[var(--color-caramel)]/[0.04]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-inset
                    focus-visible:ring-[var(--color-caramel)]
                    sm:px-8
                    sm:py-8
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      mb-4
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[var(--color-caramel)]/40
                      text-[var(--color-caramel)]
                      transition-colors
                      duration-500
                      group-hover:bg-[var(--color-caramel)]/[0.08]
                    "
                  >
                    <SectionIcon size={21} strokeWidth={1.4} />
                  </span>

                  <span
                    className="
                      font-editorial
                      text-2xl
                      leading-tight
                      text-[var(--color-espresso)]
                      sm:text-3xl
                    "
                  >
                    {section.title}
                  </span>

                  {/* SELECTION COUNT AND CHEVRON */}

                  <div className="mt-3 flex items-center justify-center gap-2.5">
                    {!isExpanded && (
                      <span
                        className="
                          font-body
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-[0.18em]
                          text-[var(--color-muted)]
                          sm:text-[11px]
                        "
                      >
                        {section.items.length > 0
                          ? `${section.items.length} ${
                              section.items.length === 1
                                ? "selection"
                                : "selections"
                            }`
                          : "Details"}
                      </span>
                    )}

                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{
                        duration: 0.45,
                        ease: luxuryEase,
                      }}
                      className="flex text-[var(--color-caramel)]"
                    >
                      <ChevronDown size={17} strokeWidth={1.4} />
                    </motion.span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={panelId}
                      key="menu-content"
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: {
                            duration: 0.65,
                            ease: luxuryEase,
                          },
                          opacity: {
                            duration: 0.4,
                            delay: 0.12,
                            ease: luxuryEase,
                          },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: {
                            duration: 0.5,
                            ease: luxuryEase,
                          },
                          opacity: {
                            duration: 0.2,
                            ease: luxuryEase,
                          },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div
                        className="
                          px-6
                          pb-8
                          pt-0
                          sm:px-8
                          sm:pb-10
                        "
                      >
                        {section.items.length > 0 ? (
                          <ul className="space-y-3">
                            {section.items.map((item, itemIndex) => (
                              <motion.li
                                key={item}
                                initial={{
                                  opacity: 0,
                                  y: 8,
                                  filter: "blur(2px)",
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                  filter: "blur(0px)",
                                }}
                                transition={{
                                  duration: 0.6,
                                  delay: itemIndex * 0.055,
                                  ease: luxuryEase,
                                }}
                                className="
                                  font-editorial
                                  text-lg
                                  leading-relaxed
                                  text-[var(--color-muted)]
                                  sm:text-xl
                                "
                              >
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        ) : (
                          <p
                            className="
                              font-editorial
                              text-lg
                              italic
                              leading-relaxed
                              text-[var(--color-muted)]
                              sm:text-xl
                            "
                          >
                            Prepared for the occasion
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </section>

        {/* CLOSING DETAIL */}

        <motion.footer
          initial={cinematicInitial}
          whileInView={cinematicAnimate}
          viewport={menuViewport}
          transition={cinematicTransition}
          className="
            mt-16
            flex
            flex-col
            items-center
            pb-8
            text-center
            sm:mt-20
          "
        >
          <ChefHat
            size={23}
            strokeWidth={1.3}
            className="text-[var(--color-caramel)]"
            aria-hidden="true"
          />

          <p
            className="
              mt-4
              font-body
              text-xs
              font-medium
              uppercase
              tracking-[0.24em]
              text-[var(--color-muted)]
            "
          >
            Prepared with love
          </p>
        </motion.footer>
      </div>
    </main>
  )
}