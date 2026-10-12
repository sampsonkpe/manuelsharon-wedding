import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import {
  HandHeart,
  Rose,
  Heart,
  BookOpenText,
  Feather,
  ClefTreble,
  Music4,
  Signature,
  FileHeart,
  Wine,
  BellDot,
  Footprints,
  ChevronDown,
} from "lucide-react"
import {
  cinematicAnimate,
  cinematicInitial,
  cinematicTransition,
  luxuryEase,
  staggerSmall,
} from "../../components/motion/motion"
import FallingPetals from "../../components/wedding-day/FallingPetals"

type ProgrammeItem = {
  title: string
  person?: string
  children?: string[]
  expandable?: "scripture" | "hymn"
}

const programme: ProgrammeItem[] = [
  {
    title: "Pre-Ceremony",
    children: [
      "Guest Arrivals & Seating",
      "Musical Interlude",
      "Ushers welcome Guests",
    ],
  },
  {
    title: "Opening Prayer & Welcome Statement",
    person: "Mr. Richmond Brempong",
  },
  {
    title: "Procession of the Bridal Party",
    children: [
      "Entrance of Bridesmaids",
      "Entrance of the Bride",
    ],
  },
  {
    title: "Vows",
    person: "Apostle K. E. Hagan",
  },
  {
    title: "Scripture Reading",
    person: "Mr. Jude Ayettey",
    expandable: "scripture",
  },
  {
    title: "Poetry",
    person: "Mr. Job Agyeman",
  },
  {
    title: "Worship",
    person: "EWC Live",
  },
  {
    title: "Sermon",
    person: "Rev. John Ametsikor",
  },
  {
    title: "Offering & Signing of Certificate",
    person: "Ministration by Eli Manuel",
    children: [
      "Couple Re-entry Announcement by Best Man",
    ],
  },
  {
    title: "Presentation of Marriage Certificate",
  },
  {
    title: "Communion",
    person: "Rev. John Ametsikor",
  },
  {
    title: "Announcements",
  },
  {
    title: "Hymn",
    person: "EWC Live",
    expandable: "hymn",
  },
  {
    title: "Closing Prayer & Benediction",
    person: "Rev. John Ametsikor",
  },
  {
    title: "Couple Recession",
  },
]

const programmeIcons = [
  Music4,
  HandHeart,
  Rose,
  Heart,
  BookOpenText,
  Feather,
  ClefTreble,
  BookOpenText,
  Signature,
  FileHeart,
  Wine,
  BellDot,
  ClefTreble,
  HandHeart,
  Footprints,
]

const scrollViewport = {
  once: false,
  amount: 0.2,
  margin: "-8% 0px -8% 0px",
}

const scriptureText =
  "“Haven’t you read,” He replied, “that He who created them in the beginning made them male and female,” and He also said: “For this reason a man will leave his father and mother and be joined to his wife, and the two will become one flesh? So they are no longer two, but one flesh. Therefore, what God has joined together, man must not separate.”"

const hymnStanzas = [
  [
    "Now thank we all our God",
    "with heart and hands and voices,",
    "who wondrous things has done,",
    "in whom his world rejoices;",
    "who from our mothers' arms",
    "has blessed us on our way",
    "with countless gifts of love,",
    "and still is ours today.",
  ],
  [
    "O may this bounteous God",
    "through all our life be near us,",
    "with ever joyful hearts",
    "and blessed peace to cheer us,",
    "to keep us in his grace,",
    "and guide us when perplexed,",
    "and free us from all ills",
    "of this world in the next.",
  ],
  [
    "All praise and thanks to God",
    "the Father now be given",
    "the Son and Spirit blest",
    "who reign in highest heaven",
    "the one eternal God",
    "whom heaven and earth adore;",
    "for thus it was, is now,",
    "and shall be evermore.",
  ],
]

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

export default function ProgrammePage() {
  const [openItem, setOpenItem] =
    useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenItem((current) =>
      current === index ? null : index,
    )
  }

  return (
    <main className="min-h-screen bg-transparent">
      <FallingPetals />

        <div
          className="
            relative
            z-20
            mx-auto
            w-full
            max-w-[900px]
            px-[var(--page-padding)]
            py-20
            sm:py-28
          "
        >

        {/* =================================================
            HEADER
            ================================================= */}

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

          {/* =================================================
              COUPLE NAMES
              Same visual treatment as the splash
              ================================================= */}

          <div
            className="
              relative
              mt-8
              flex
              w-full
              justify-center
              overflow-visible
              px-8
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
              {/* MANUEL */}

              <motion.div
                initial={nameInitial}
                animate={nameAnimate}
                transition={{
                  ...nameTransition,
                  delay: staggerSmall,
                }}
                className="
                  flex
                  w-fit
                  max-w-none
                  justify-center
                  overflow-visible
                "
              >
                <span
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
                </span>
              </motion.div>

              {/* AMPERSAND */}

              <motion.div
                initial={nameInitial}
                animate={nameAnimate}
                transition={{
                  ...nameTransition,
                  delay: staggerSmall * 2,
                }}
                className="
                  flex
                  w-fit
                  justify-center
                  overflow-visible
                "
              >
                <span
                  className="
                    inline-block
                    overflow-visible
                    font-display
                    text-[clamp(2.1rem,8.8vw,4.2rem)]
                    leading-none
                  "
                >
                  &amp;
                </span>
              </motion.div>

              {/* SHARON */}

              <motion.div
                initial={nameInitial}
                animate={nameAnimate}
                transition={{
                  ...nameTransition,
                  delay: staggerSmall * 3,
                }}
                className="
                  flex
                  w-fit
                  max-w-none
                  justify-center
                  overflow-visible
                "
              >
                <span
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
                </span>
              </motion.div>
            </h1>
          </div>

          <div
            className="
              mx-auto
              mt-8
              h-px
              w-8
              bg-[var(--color-caramel)]
            "
          />

          <p
            className="
              font-body
              mt-8
              text-md
              font-medium
              uppercase
              tracking-[0.24em]
              text-[var(--color-espresso)]
              sm:text-base
            "
          >
            Order of Service
          </p>
        </motion.header>

        {/* =================================================
            PROGRAMME
            ================================================= */}

        <section className="mt-10 sm:mt-24">
          <div
            className="
              border-t
              border-[var(--color-border)]
            "
          >
            {programme.map((item, index) => {
              const isOpen =
                openItem === index

              const hasChildren =
                Boolean(
                  item.children &&
                    item.children.length > 0,
                )

              const isExpandable =
                hasChildren ||
                Boolean(item.expandable)

              const ProgrammeIcon = programmeIcons[index]

              const content = (
                <>
                  {/* =================================================
                      PROGRAMME ICON
                      ================================================= */}

                  <span
                    className="
                      mb-4
                      flex
                      justify-center
                      text-[var(--color-caramel)]
                    "
                    aria-hidden="true"
                  >
                    <ProgrammeIcon
                      size={28}
                      strokeWidth={1.5}
                    />
                  </span>

                  {/* =================================================
                      TITLE
                      ================================================= */}

                  <span
                    className="
                      block
                      font-editorial
                      text-2xl
                      leading-[1.2]
                      tracking-[-0.01em]
                      text-[var(--color-espresso)]
                      sm:text-3xl
                    "
                  >
                    {item.title}
                  </span>

                  {/* =================================================
                      PERSON
                      ================================================= */}

                  {item.person && (
                    <span
                      className="
                        mt-2
                        block
                        font-body
                        text-sm
                        font-medium
                        uppercase
                        tracking-[0.2em]
                        text-[var(--color-muted)]
                        sm:text-base
                      "
                    >
                      {item.person}
                    </span>
                  )}

                  {/* =================================================
                      EXPAND INDICATOR
                      ================================================= */}

                  {isExpandable && (
                    <motion.span
                      animate={{
                        rotate: isOpen ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: luxuryEase,
                      }}
                      className="
                        mx-auto
                        mt-4
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        text-[var(--color-caramel)]
                      "
                      aria-hidden="true"
                    >
                      <ChevronDown
                        size={18}
                        strokeWidth={1.5}
                      />
                    </motion.span>
                  )}
                </>
              )

              return (
                <motion.article
                  key={item.title}
                  initial={cinematicInitial}
                  whileInView={cinematicAnimate}
                  viewport={scrollViewport}
                  transition={{
                    ...cinematicTransition,
                    delay: 0.03,
                  }}
                  className="
                    border-b
                    border-[var(--color-border)]
                    text-center
                  "
                >
                  {/* =================================================
                      ITEM HEADER
                      ================================================= */}

                  {isExpandable ? (
                    <button
                      type="button"
                      onClick={() =>
                        toggleItem(index)
                      }
                      aria-expanded={isOpen}
                      className="
                        block
                        w-full
                        py-8
                        text-center
                        sm:py-10
                      "
                    >
                      {content}
                    </button>
                  ) : (
                    <div
                      className="
                        py-8
                        sm:py-10
                      "
                    >
                      {content}
                    </div>
                  )}

                  {/* =================================================
                      CHILD EVENTS
                      ================================================= */}

                  <AnimatePresence initial={false}>
                    {isOpen &&
                      hasChildren && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                            filter: "blur(3px)",
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            filter: "blur(0px)",
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            filter: "blur(3px)",
                          }}
                          transition={{
                            duration: 0.7,
                            ease: luxuryEase,
                          }}
                          className="overflow-hidden"
                        >
                          <div
                            className="
                              mx-auto
                              max-w-[500px]
                              px-5
                              pb-8
                              sm:pb-10
                            "
                          >
                            <div className="space-y-3">
                              {item.children?.map(
                                (child) => (
                                  <p
                                    key={child}
                                    className="
                                      font-editorial
                                      text-lg
                                      leading-[1.5]
                                      text-[var(--color-muted)]
                                      sm:text-xl
                                    "
                                  >
                                    {child}
                                  </p>
                                ),
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>

                  {/* =================================================
                      SCRIPTURE
                      ================================================= */}

                  <AnimatePresence initial={false}>
                    {isOpen &&
                      item.expandable ===
                        "scripture" && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                            filter: "blur(3px)",
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            filter: "blur(0px)",
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            filter: "blur(3px)",
                          }}
                          transition={{
                            duration: 0.8,
                            ease: luxuryEase,
                          }}
                          className="overflow-hidden"
                        >
                          <div
                            className="
                              mx-auto
                              max-w-[680px]
                              px-5
                              pb-10
                              sm:px-8
                              sm:pb-12
                            "
                          >
                            <p
                              className="
                                font-body
                                text-sm
                                font-medium
                                uppercase
                                tracking-[0.2em]
                                text-[var(--color-muted)]
                              "
                            >
                              Matthew 19:4–6 · HCSB
                            </p>

                            <p
                              className="
                                mt-6
                                font-editorial
                                text-lg
                                leading-[1.65]
                                text-[var(--color-espresso)]
                                sm:text-xl
                              "
                            >
                              {scriptureText}
                            </p>
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>

                  {/* =================================================
                      HYMN
                      ================================================= */}

                  <AnimatePresence initial={false}>
                    {isOpen &&
                      item.expandable ===
                        "hymn" && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                            filter: "blur(3px)",
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            filter: "blur(0px)",
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            filter: "blur(3px)",
                          }}
                          transition={{
                            duration: 0.8,
                            ease: luxuryEase,
                          }}
                          className="overflow-hidden"
                        >
                          <div
                            className="
                              mx-auto
                              max-w-[680px]
                              px-5
                              pb-10
                              text-center
                              sm:px-8
                              sm:pb-12
                            "
                          >
                            <p
                              className="
                                font-body
                                text-sm
                                font-medium
                                uppercase
                                tracking-[0.2em]
                                text-[var(--color-muted)]
                              "
                            >
                              Now Thank We All
                              Our God
                            </p>

                            <div
                              className="
                                mx-auto
                                mt-8
                                max-w-[560px]
                                space-y-10
                                sm:mt-10
                              "
                            >
                              {hymnStanzas.map(
                                (
                                  stanza,
                                  stanzaIndex,
                                ) => (
                                  <div
                                    key={
                                      stanzaIndex
                                    }
                                  >
                                    <p
                                      className="
                                        font-editorial
                                        text-lg
                                        leading-[1.65]
                                        text-[var(--color-espresso)]
                                        sm:text-xl
                                      "
                                    >
                                      {stanza.map(
                                        (
                                          line,
                                          lineIndex,
                                        ) => (
                                          <span
                                            key={`${stanzaIndex}-${lineIndex}`}
                                            className="block"
                                          >
                                            {line}
                                          </span>
                                        ),
                                      )}
                                    </p>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </motion.article>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}