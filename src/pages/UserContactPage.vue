<template>
  <div class="chat-container">
    <div class="chat-header">
      <span class="chat-title">Chat</span>
      <van-button icon="setting-o" type="primary" plain size="small" />
    </div>
    <div class="chat-content">
      <van-list :finished="finished" finished-text="No more messages">
        <div
            v-for="(message, index) in messages"
            :key="index"
            :class="['message-item', { 'message-sent': isSentByMe(message) }]"
        >
          <div class="message-content">{{ message.text }}</div>
        </div>
      </van-list>
    </div>
    <div class="chat-footer">
      <van-field
          v-model="newMessage"
          placeholder="Type a message"
          @keyup.enter="sendMessage"
      />
      <van-button type="primary" @click="sendMessage" class="send-button">
        Send
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      newMessage: '',
      finished: false
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage) {
        this.messages.push({ text: this.newMessage, sentByMe: true });
        this.newMessage = '';
      }
    },
    isSentByMe(message) {
      return message.sentByMe;
    }
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 25px); /* 预留底部25px距离 */
  max-width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: linear-gradient(135deg, #a8edea, #fed6e3);
  animation: gradientBG 10s ease infinite;
}
@keyframes gradientBG {
  0%, 100% {
    background: linear-gradient(135deg, #a8edea, #fed6e3);
  }
  50% {
    background: linear-gradient(135deg, #f6d365, #fda085);
  }
}
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: linear-gradient(135deg, #085078, #85d8ce);
  color: #fff;
  border-radius: 8px;
  animation: gradientHeader 10s ease infinite;
}
@keyframes gradientHeader {
  0%, 100% {
    background: linear-gradient(135deg, #085078, #85d8ce);
  }
  50% {
    background: linear-gradient(135deg, #ff9a9e, #fad0c4);
  }
}
.chat-title {
  font-weight: bold;
  font-size: 18px;
}
.chat-content {
  flex: 1;
  overflow-y: auto;
  padding: 5px; /* 减少内边距 */
  margin-top: 10px;
}
.message-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
}
.message-sent {
  align-items: flex-end;
}
.message-content {
  max-width: 60%;
  padding: 10px;
  margin-bottom: 5px;
  background: linear-gradient(135deg, #fff6e6, #ffdcd2);
  border-radius: 8px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  word-wrap: break-word; /* 自动换行 */
  animation: gradientMessage 10s ease infinite;
}
@keyframes gradientMessage {
  0%, 100% {
    background: linear-gradient(135deg, #fff6e6, #ffdcd2);
  }
  50% {
    background: linear-gradient(135deg, #d4fc79, #96e6a1);
  }
}
.message-sent .message-content {
  background: linear-gradient(135deg, #d4fc79, #96e6a1);
  animation: gradientSentMessage 10s ease infinite;
}
@keyframes gradientSentMessage {
  0%, 100% {
    background: linear-gradient(135deg, #d4fc79, #96e6a1);
  }
  50% {
    background: linear-gradient(135deg, #a8edea, #fed6e3);
  }
}
.chat-footer {
  display: flex;
  align-items: center;
  padding: 5px;
  background: linear-gradient(135deg, #cfd9df, #e2ebf0);
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 25px; /* 向上移动一些距离 */
  animation: gradientFooter 10s ease infinite;
}
@keyframes gradientFooter {
  0%, 100% {
    background: linear-gradient(135deg, #cfd9df, #e2ebf0);
  }
  50% {
    background: linear-gradient(135deg, #fad0c4, #ffd1ff);
  }
}
.van-field {
  flex: 1;
  margin-right: 10px;
}
.send-button {
  flex-shrink: 0;
  border-radius: 20px;
}
.van-button--primary {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border: none;
  color: #fff;
}
.van-button--primary:hover {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border: none;
}
</style>
