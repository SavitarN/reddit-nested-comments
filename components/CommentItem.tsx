import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import { Comment } from '../App';
import { StyleSheet } from 'react-native';
import CustomTextInput from './CustomTextInput';
type Props = {
  commentObj: Comment;
  onReply: (parentID: string, replyMessage: string) => void;
  level?: number;
};
const CommentItem: React.FC<Props> = ({ commentObj, level = 0, onReply }) => {
  const [replyBox, setShowReplyBox] = useState(false);
  return (
    <View style={styles.commentContainer}>
      <Text
        style={[
          {
            color: 'black',
            marginBottom: 10,
            fontSize: 20,
            marginHorizontal: level * 20,
          },
        ]}
      >
        @:{commentObj.text}
      </Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => setShowReplyBox(prev => !prev)}
      >
        <Text>Reply</Text>
        {replyBox && (
          <CustomTextInput
            placeholder="Write a Reply "
            addComments={replyText => {
              onReply(commentObj.id, replyText), setShowReplyBox;
            }}
          />
        )}
        {commentObj.replies.map(reply => (
          <CommentItem
            key={reply.id}
            commentObj={reply}
            onReply={onReply}
            level={level + 1}
          />
        ))}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  commentContainer: {
    // backgroundColor: '#4d524aaf',
    borderRadius: 20,
    margin: 10,
    padding: 10,
  },
  btn: {
    alignSelf: 'flex-start',
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 20,
  },
});

export default CommentItem;
