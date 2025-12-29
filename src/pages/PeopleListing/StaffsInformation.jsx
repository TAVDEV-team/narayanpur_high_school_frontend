
import { useFetchList } from "./UseFetchList";
import ListWrapper from "../../components/Common/ListWrapper";
import PersonCard from "../../components/Common/PersonCard";
import Pagination from "../../components/Pagination";

export default function helpersInformation() {
  const {
    data: helpers,
    loading,
    error,
    page,
    setPage,
    next,
    previous
   } = useFetchList("/user/office-helpers/");

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
            <ListWrapper title="helpers" data={helpers} loading={loading} error={error}>
      {helpers.map((staff) => (
        <PersonCard
          key={staff.account.id}
          account={staff.account}
          rightExtra={
            <>
              {staff.account.display_religion && (
                <p><b>Religion:</b> {staff.account.display_religion}</p>
              )}
              {staff.account.gender && (
                <p><b>Gender:</b> {staff.account.gender}</p>
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
