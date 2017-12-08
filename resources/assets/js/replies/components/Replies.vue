<template>
    <div>
        <div class="card" v-for="data in replies">
            <div class="card-content">
                <span class="card-title">{{data.user.name}} {{ replied }}</span>

                <blockquote>
                    {{ data.body }}
                </blockquote>
            </div>
        </div>

        <div class="card grey lighten-4">
            <div class="card-content">
                <span class="card-title">{{ reply }}</span>

                <form @submit.prevent="save()">
                    <div class="input-field">
                        <textarea rows="10" class="materialize-textarea" :placeholder="yourAnswer" v-model="reply_to_save.body"></textarea>
                    </div>
                    <button type="submit" class="btn red accent-2">{{ send }}</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'replied',
            'reply',
            'yourAnswer',
            'send',
            'threadId'
        ],
        data() {
            return {
                replies: [],
                thread_id: this.threadId,
                reply_to_save: {
                    body: '',
                    thread_id: this.threadId,
                }
            }
        },
        methods: {
            save() {
                window.axios.post('/replies', this.reply_to_save).then(() => {
                    this.getReplies()
                })
            },
            getReplies() {
                window.axios.get('/replies/' + this.thread_id).then((response) => {
                    this.replies = response.data;
                });
            }
        },
        mounted() {
            this.getReplies()

            Echo.channel('new.reply.' + this.thread_id)
                .listen('NewReply', (e) => {
                    console.log(e);
                    if (e.reply) {
                        this.getReplies()
                    }
                });
        }
    }
</script>
