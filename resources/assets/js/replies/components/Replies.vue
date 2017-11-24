<template>
    <div>
        <div class="card">
            <div class="card-content">
                <span class="card-title">Erik {{ replied }}</span>

                <blockquote>
                    erum at eius voluptatem nihil asperiores. Ea enim aut unde sunt dolor adipisci aut ea. Labore animi nihil aut beatae est autem dolorem. Autem quo sit exercitationem qui fugiat non.
                </blockquote>
            </div>
        </div>
        <div class="card">
            <div class="card-content">
                <span class="card-title">Erik {{ replied }}</span>

                <blockquote>
                    erum at eius voluptatem nihil asperiores. Ea enim aut unde sunt dolor adipisci aut ea. Labore animi nihil aut beatae est autem dolorem. Autem quo sit exercitationem qui fugiat non.
                </blockquote>
            </div>
        </div>
        <div class="card">
            <div class="card-content">
                <span class="card-title">Erik {{ replied }}</span>

                <blockquote>
                    erum at eius voluptatem nihil asperiores. Ea enim aut unde sunt dolor adipisci aut ea. Labore animi nihil aut beatae est autem dolorem. Autem quo sit exercitationem qui fugiat non.
                </blockquote>
            </div>
        </div>


        <div class="card grey lighten-4">
            <div class="card-content">
                <span class="card-title">{{ reply }}</span>

                <form>
                    <div class="input-field">
                        <textarea rows="10" class="materialize-textarea" :placeholder="yourAnswer"></textarea>
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
        ]
    }
</script>
