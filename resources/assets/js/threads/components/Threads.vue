<template>
    <div class="card">
        <div class="card-content">
            <span class="card-title">{{ title }}</span>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{{ threads }}</th>
                        <th>{{ replies }}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="thread in threads_response.data"  :class="{ 'lime lighten-4': thread.fixed }">
                        <td>{{ thread.id }}</td>
                        <td>{{ thread.title }}</td>
                        <td>{{ thread.replies_count || 0 }}</td>
                        <td>
                            <a :href="'/threads/' + thread.id" class="btn">{{ open }}</a>
                            <a :href="'/thread/pin/' + thread.id" class="btn" v-if="logged.role === 'admin'">Fixar</a>
                            <a :href="'/thread/close/' + thread.id" class="btn" v-if="logged.role === 'admin'">Fechar</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="card-content">
            <span class="card-title">{{newThread}}</span>

            <form @submit.prevent="save()">
                <div class="input-field">
                    <input type="text" :placeholder="threadTitle" v-model="threads_to_save.title">
                </div>
                <div class="input-field">
                    <textarea class="materialize-textarea" :placeholder="threadBody" v-model="threads_to_save.body"></textarea>
                </div>
                <button type="submit" class="btn red accent-2">{{send}}</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'title',
            'threads',
            'replies',
            'open',
            'newThread',
            'threadTitle',
            'threadBody',
            'send',
        ],
        data() {
            return {
                threads_response: [],
                logged: window.user || {},
                threads_to_save: {
                    title: '',
                    body: ''
                }
            }
        },
        methods: {
            save() {
                window.axios.post('/threads', this.threads_to_save).then(() => {
                    this.getThreads()
                })
            },
            getThreads() {
                window.axios.get('/threads').then((response) => {
                    this.threads_response = response.data
                })
            }
        },
        mounted() {
            this.getThreads()

            Echo.channel('new.thread')
                .listen('NewThread', (e) => {
                    console.log(e)
                    if (e.thread) {
                        this.threads_response.data.splice(0, 0, e.thread)
                    }
                });
        }
    }
</script>
