<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ExampleTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function testReplies()
    {
        $this->seed('RepliesTableSeeder');

        $response = $this->get('/threads/1');
        $response->assertStatus(200);

        $response = $this->get('/threads/2');
        $response->assertStatus(200);

        $response = $this->get('/threads/a');
        $response->assertStatus(404);
    }

    public function testThreadVisualization()
    {
        $this->seed('ThreadsTableSeeder');

        $thread = \App\Thread::find(1);

        $response = $this->get('/threads/1');
        $response->assertSee($thread->title);
        $response->assertSee($thread->body);
    }
}
