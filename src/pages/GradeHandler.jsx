import { useParams } from "react-router-dom";
import ClassGroups from "./ClassGroups";
import ClassStudents from "./ClassStudents";

const noGroupGrades = ["6", "7", "8","9_science","10_science"];

export default function GradeHandler() {
  const { grade } = useParams();
    return <
      ClassStudents 
      grade={grade}
      // group="all" 
    />;
}
//   if (noGroupGrades.includes(grade)) {
//   //   return <
//   //     ClassStudents 
//   //     grade={grade}
//   //     // group="all" 
//   //   />;

//   // } else {
//   //   // For grades 9-10, show group selection
//   //   return <
//   //   ClassGroups
    
//   //   />;
//   // }
// }
