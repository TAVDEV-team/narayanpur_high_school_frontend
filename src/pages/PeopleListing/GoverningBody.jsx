import { useFetchList } from "./UseFetchList";
import ListWrapper from "../../components/Common/ListWrapper";
import PersonCard from "../../components/Common/PersonCard";
import Pagination from "../../components/Pagination";

export default function GoverningBody() {
  const { 
    data: members,
    loading,
    error,
    page,
    setPage,
    next,
    previous,
  } = useFetchList("/user/governing/");

  return (
      <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <ListWrapper title="Governing Body" data={members} loading={loading} error={error}>
      {members.map((member) => (
        <PersonCard
          key={member.account?.id || member.designation}
          account={member.account}
          extra={
            <>
              <p className="font-semibold capitalize">{member.designation}</p>
              <p className="text-sm text-gray-600">{member.profession}</p>
            </>
          }
          rightExtra={
            member.account?.address && <p><b>Address:</b> {member.account.address}</p>
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
