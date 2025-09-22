import Image from "next/image";
import styles from "./comments.module.css";

interface SingleCommentProps {
  item: any;
}

function SingleComment({ item }: SingleCommentProps) {
  return (
    <div className={styles.comment}>
      <div className={styles.user}>
        {item?.user?.img ? (
          <Image
            src={item.user.img}
            alt=""
            width={50}
            height={50}
            className={styles.image}
          />
        ) : (
          <Image
            src={"/icons8-avatar-50.png"}
            alt="User avatar"
            width={50}
            height={50}
            className={styles.image}
          />
        )}
        <div className={styles.userInfo}>
          <span className={styles.username}>{item.user.userName}</span>
          <span className={styles.date}>{item.createdAt.slice(0, 10)}</span>
        </div>
      </div>
      <p className={styles.desc}>{item.desc}</p>
    </div>
  );
}

export default SingleComment;

/*
const deleteCommentMutation = useMutation({
  mutationFn: (id: string) => deleteCommentApi(id), // your API call
  onSuccess: (deletedId) => {
    queryClient.setQueryData(["comments"], (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
          ...page,
          data: page.data.filter((comment: any) => comment.id !== deletedId),
        })),
      };
    });
  },
});


const queryClient = useQueryClient();

const editCommentMutation = useMutation({
  mutationFn: ({ id, desc }: { id: string; desc: string }) =>
    editCommentApi(id, desc), // your API call
  onSuccess: (updatedComment) => {
    queryClient.setQueryData(["comments"], (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
          ...page,
          data: page.data.map((comment: any) =>
            comment.id === updatedComment.id
              ? { ...comment, ...updatedComment } // update the one comment
              : comment
          ),
        })),
      };
    });
  },
});


*/
