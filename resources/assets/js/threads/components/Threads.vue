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
                    <tr v-for="thread in threads_response.data">
                        <td>{{ thread.id }}</td>
                        <td>{{ thread.title }}</td>
                        <td>0</td>
                        <td>
                            <a :href="'/threads/' + thread.id">{{ open }}</a>
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
        }
    }
</script>
