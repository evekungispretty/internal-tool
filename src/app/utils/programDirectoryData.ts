export type DeliveryMode = "on-campus" | "online" | "hybrid";
export type ProgramStatus = "draft" | "published" | "archived";

export interface ProgramDegree {
  id: string;
  degreeCategory?: string;
  type: string;
  deliveryMode: DeliveryMode;
  url: string;
}

export interface ProgramRecord {
  id: string;
  title: string;
  school: string;
  category: string;
  description: string;
  image: string;
  status: ProgramStatus;
  degrees: ProgramDegree[];
}

interface LegacyDegree {
  name: string;
  sublink?: string;
}

interface LegacyProgram {
  id: string;
  title: string;
  programs: string;
  types: string;
  school: string;
  intro?: string;
  image?: string;
}

const SCHOOL_TO_CATEGORY: Record<string, string> = {
  "1": "School of Teaching & Learning",
  "2": "Human Development & Organizational Studies",
  "3": "Special Education, School Psychology & Early Childhood",
};

export const DEFAULT_PROGRAM_CATEGORIES = Object.values(SCHOOL_TO_CATEGORY);

const RAW_PROGRAMS: LegacyProgram[] = [
  {
    id: "2",
    title: "BILINGUAL/ESOL EDUCATION",
    programs:
      '[{"name":"M.A.E.","sublink":"https://education.ufl.edu/esol/"},{"name":"M.Ed.","sublink":"https://education.ufl.edu/esol/degrees/#masters"},{"name":"Ed.S.","sublink":"https://education.ufl.edu/esol/degrees/#specialist"},{"name":"Ph.D.","sublink":"https://education.ufl.edu/esol/degrees/#doctorate"}]',
    types: '["On Campus"]',
    school: "1",
    intro:
      "The ESOL/Bilingual Education program integrates linguistics and psychology with practical teaching practica and research.",
    image:
      "https://education.ufl.edu/program-directory/files/2024/01/Bilingual_ESOL-PhD.png",
  },
  {
    id: "8",
    title: "EDUCATIONAL LEADERSHIP AND POLICY",
    programs:
      '[{"name":"Ed.S.","sublink":"https://education.ufl.edu/educational-leadership/prospective-students/ed-s/"},{"name":"Ed.D.","sublink":"https://education.ufl.edu/educational-leadership/prospective-students/online-ed-d/"},{"name":"Online M.Ed.- School Leadership Track","sublink":"https://education.ufl.edu/educational-leadership/prospective-students/online-m-ed/"},{"name":"Ph.D.","sublink":"https://education.ufl.edu/educational-leadership/prospective-students/on-campus-ph-d/"}]',
    types: '["Educator Certification","On Campus","Online"]',
    school: "2",
    intro:
      "Prepares you to lead and shape the future of K-12 education through practice, research, and policy engagement.",
    image:
      "https://education.ufl.edu/program-directory/files/2024/01/Ed-Admin-and-Policy_Ed-Leadership.png",
  },
  {
    id: "9",
    title: "EDUCATIONAL TECHNOLOGY",
    programs:
      '[{"name":"Certificate","sublink":"https://education.ufl.edu/educational-technology/prospective-students/graduate-certificate/"},{"name":"M.A.E.","sublink":"https://education.ufl.edu/educational-technology/prospective-students/on-campus-mae/"},{"name":"M.Ed.","sublink":"https://education.ufl.edu/educational-technology/prospective-students/online-med/"},{"name":"Ed.D.","sublink":"https://education.ufl.edu/educational-technology/prospective-students/online-edd/"}]',
    types: '["On Campus","Online"]',
    school: "1",
    intro:
      "Collaborate globally to research and implement innovative technologies across K-20 settings.",
    image:
      "https://education.ufl.edu/program-directory/files/2024/01/Ed-Tech-B-Roll-65.jpg",
  },
  {
    id: "12",
    title: "ELEMENTARY EDUCATION",
    programs:
      '[{"name":"On Campus B.A.E.","sublink":"https://education.ufl.edu/elementary-education/bachelors/"},{"name":"Online B.A.E.","sublink":"https://education.ufl.edu/elementary-education/prospective-students/elementary-online/"}]',
    types: '["Educator Certification","On Campus","Online"]',
    school: "1",
    intro:
      "Hands-on clinical experiences and a year-long internship to foster inclusive elementary classrooms.",
    image: "https://education.ufl.edu/program-directory/files/2024/01/Elem-Ed.jpg",
  },
  {
    id: "14",
    title: "HIGHER EDUCATION ADMINISTRATION",
    programs:
      '[{"name":"Online M.Ed.","sublink":"https://education.ufl.edu/higher-education/prospective-students/online-med/"},{"name":"On Campus M.Ed.","sublink":"https://education.ufl.edu/higher-education/prospective-students/on-campus-med/"},{"name":"Ed.D.","sublink":"https://education.ufl.edu/higher-education/prospective-students/hybrid-edd/"},{"name":"Ph.D.","sublink":"https://education.ufl.edu/higher-education/prospective-students/on-campus-phd/"}]',
    types: '["On Campus","Online"]',
    school: "2",
    intro:
      "Prepares future leaders for policy, faculty, and administrative roles in higher education.",
    image:
      "https://education.ufl.edu/program-directory/files/2024/01/Higher-Ed-Admin-EdD.png",
  },
];

const ACRONYMS = new Set(["ESOL", "UFTEACH", "UF", "AI", "TLSI", "STEM", "COE"]);

function smartTitle(value: string): string {
  if (!value) return value;
  if (/[a-z]/.test(value)) return value;
  return value
    .split(/(\s+|[\/&,])/)
    .map((token) => {
      const upper = token.toUpperCase().replace(/[^A-Z0-9]/g, "");
      if (ACRONYMS.has(upper)) return token.toUpperCase();
      if (/^\s+$/.test(token) || /^[\/&,]$/.test(token)) return token;
      if (!token.length) return token;
      return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
    })
    .join("");
}

function inferDelivery(
  name: string,
  sublink: string | undefined,
  typesList: string[]
): DeliveryMode {
  const text = `${name} ${sublink ?? ""}`.toLowerCase();
  if (/\bhybrid\b/.test(text)) return "hybrid";
  if (/\bonline\b/.test(text)) return "online";
  if (/\bon[\s-]?campus\b/.test(text)) return "on-campus";

  const hasOnline = typesList.includes("Online");
  const hasOnCampus = typesList.includes("On Campus");
  if (hasOnline && !hasOnCampus) return "online";
  if (hasOnCampus && !hasOnline) return "on-campus";
  return "on-campus";
}

function cleanDegreeName(name: string): string {
  return name
    .replace(/^online\s+/i, "")
    .replace(/^on[\s-]?campus\s+/i, "")
    .replace(/^hybrid\s+/i, "")
    .replace(/^\s*[-–—]\s*/, "")
    .trim();
}

function inferDegreeCategory(name: string): string {
  const value = name.toLowerCase();
  if (value.includes("ph.d") || value.includes("ed.d") || value.includes("doctor")) {
    return "Doctorate";
  }
  if (
    value.includes("m.a") ||
    value.includes("m.ed") ||
    value.includes("ed.s") ||
    value.includes("master")
  ) {
    return "Masters";
  }
  if (value.includes("b.a") || value.includes("b.s") || value.includes("bachelor")) {
    return "Bachelors";
  }
  if (value.includes("certificate")) {
    return "Certificate";
  }
  return "";
}

export function migratePrograms(rawList: LegacyProgram[]): ProgramRecord[] {
  return rawList.map((raw) => {
    let degreeList: LegacyDegree[] = [];
    let typesList: string[] = [];
    try {
      degreeList = JSON.parse(raw.programs);
    } catch {
      degreeList = [];
    }
    try {
      typesList = JSON.parse(raw.types);
    } catch {
      typesList = [];
    }

    return {
      id: `p_${raw.id}`,
      title: smartTitle(raw.title),
      school: SCHOOL_TO_CATEGORY[raw.school] ?? "Uncategorized",
      category: SCHOOL_TO_CATEGORY[raw.school] ?? "Uncategorized",
      description: raw.intro ?? "",
      image: raw.image ?? "",
      status: "published",
      degrees: degreeList.map((degree, index) => ({
        id: `d_${raw.id}_${index}`,
        degreeCategory: inferDegreeCategory(degree.name),
        type: cleanDegreeName(degree.name),
        deliveryMode: inferDelivery(degree.name, degree.sublink, typesList),
        url: degree.sublink ?? "",
      })),
    };
  });
}

export const PROGRAM_DIRECTORY_SEED = migratePrograms(RAW_PROGRAMS);
