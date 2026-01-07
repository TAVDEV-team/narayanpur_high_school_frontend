import { ListAPI } from "../../api/ListAPI";
import ListWrapper from "../../components/Common/ListWrapper";
import PersonCard from "../../components/Common/PersonCard";
import Pagination from "../../components/Pagination";

export default function TeacherInformation() {
  const {
    data: teachers,
    loading,
    error,
    page,
    setPage,
    next,
    previous,
  } = ListAPI("/user/teachers/");
  console.log(teachers)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <ListWrapper title="Teachers" data={teachers} loading={loading} error={error}>
          {teachers.map((teacher) => (
            <PersonCard
              key={teacher.id}
              account={teacher}
              rightExtra={
                <>
                  {teacher.religion && (
                    <p><b>Religion:</b> {teacher.religion}</p>
                  )}
                  {teacher.base_subject_detail && (
                    <p><b>Subject:</b> {teacher.base_subject_detail.name}</p>
                  )}
                </>
              }
            />
          ))}
        </ListWrapper>
      </div>

      <div className="mt-auto">
      <Pagination
        page={page}
        next={next}
        previous={previous}
        onPageChange={setPage}
      />
    </div>
    </div>
  );
}
