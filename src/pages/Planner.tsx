import { useState, createContext, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";

import Stages from "components/planner/Stages";
import Tabs from "components/planner/Tabs";
import { PageTitle } from "components/ui/Headings";

import plannerInit from "config/planner";
import questsInit from "config/quests";
import attrsInit from "config/attrs";

import questsReducer from "reducers/quests";
import attrsReducer from "reducers/attrs";
import skillsReducer from "reducers/skills";

//context
export const PlannerContext = createContext({} as IPlannerContext);


// TODO: CONSIDER USING THE CONTEXT AS A CUSTOM HOOK
// export const usePlanner = () => useContext(PlannerContext);
// const { ...props } = usePlanner();


const gearsInit: IGear[] = [
  /* {
    type: 'ARMOR',
    props: {
      strength: 10
    }
  },
  {
    type: 'WEAPON',
    props: {
      dexterity: 20
    }
  },
  {
    type: 'AMULET',
    props: {
      allAttrs: 5
    }
  } */
]

export default function Planner() {
  //route params
  const charClass = useParams<{ character: string }>().character;

  //state
  const [planner, setPlanner] = useState(plannerInit);
  const [characterData, setCharacterData] = useState({} as ICharacterData);

  const [level, setLevel] = useState(1);
  const [attrs, dispatchAttrs] = useReducer(attrsReducer, attrsInit);
  const [attrPoints, setAttrPoints] = useState(0);

  const [quests, dispatchQuests] = useReducer(questsReducer, questsInit);

  const [skills, dispatchSkills] = useReducer(skillsReducer, []);
  const [skillPoints, setSkillPoints] = useState(0);

  const [gears, setGears] = useState(gearsInit);

  const [isLoading, setIsLoading] = useState(false);

  //props
  const plannerContextProps: IPlannerContext = {
    charClass, characterData,

    planner, setPlanner,

    level, setLevel,
    attrs, dispatchAttrs,
    attrPoints, setAttrPoints,

    quests, dispatchQuests,

    skills, dispatchSkills,
    skillPoints, setSkillPoints,

    gears, setGears
  }

  //on mount: retrieve character data
  useEffect(() => {
    setIsLoading(true);
    (async function () {
      try {
        //const response = await fetch(`https://d2calc-24ee1-default-rtdb.firebaseio.com/class/${charClass}.json`);
        const response = await fetch(`/data/classes/${charClass}.json`);
        const data = await response.json();
        const { skills, attributes }: ICharacterData = data;

        setCharacterData(data);

        dispatchAttrs({
          type: 'INIT',
          payload: {
            initialState: {
              strength: {
                ...attrsInit.strength,
                base: attributes.strength,
                total: attributes.strength
              },
              dexterity: {
                ...attrsInit.dexterity,
                base: attributes.dexterity,
                total: attributes.dexterity
              },
              vitality: {
                ...attrsInit.vitality,
                base: attributes.vitality,
                total: attributes.vitality
              },
              energy: {
                ...attrsInit.energy,
                base: attributes.energy,
                total: attributes.energy
              }
            }
          }
        });

        dispatchSkills({
          type: 'INIT',
          payload: {
            initialState: skills.list
          }
        });

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    })();
  }, [charClass]);

  return (
    <>
      <PageTitle>{level > 1 && `Level ${level} `}{charClass}</PageTitle>
      {isLoading ?
        <div>LOADING DATA...</div>
        :
        <PlannerContext.Provider value={plannerContextProps}>
          <Tabs />
          <Stages />
        </PlannerContext.Provider>
      }
    </>
  )
}
