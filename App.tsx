import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native/';
import CustomTextInput from './components/CustomTextInput';
import { useState } from 'react';
import { ScrollView } from 'react-native/';

import CommentItem from './components/CommentItem';

export type Comment = {
  id: string;
  text: string;
  replies: Comment[];
};
function App() {
  const [comments, setComment] = useState<Comment[]>([]);

  const addComments = (text: string) => {
    const newComment = {
      id: new Date(),
      text: text,
      replies: [],
    };
    setComment(prevComments => [newComment, ...prevComments]);
  };

  const handleReply = (parentID: string, replyText: string) => {
    const addReplyRecursive = (items: Comment[]): Comment[] =>
      items.map(item => {
        if (item.id === parentID) {
          return {
            ...item,
            replies: [
              ...item.replies,
              { id: Date.now().toString(), text: replyText, replies: [] },
            ],
          };
        }
        return { ...item, replies: addReplyRecursive(item.replies) };
      });

    setComment(prev => addReplyRecursive(prev));
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <CustomTextInput
          placeholder="Share Your Thoughts"
          addComments={addComments}
        />
        <ScrollView style={styles.scrollViewContent}>
          {comments.map(comment => (
            <CommentItem
              key={comment.id}
              commentObj={comment}
              onReply={handleReply}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',

    padding: 20,
  },
  scrollViewContent: {
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white',
  },
});

export default App;
