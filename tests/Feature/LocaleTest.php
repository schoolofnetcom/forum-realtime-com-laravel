<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LocaleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testRoute()
    {
        $response = $this->get('/locale/en');
        $response->assertStatus(302);
    }

    public function testTranslation()
    {
        $response = $this->withSession(['locale'=>'pt-br'])->get('/');
        $response->assertSee('Tópicos mais rescentes');
    }
}
