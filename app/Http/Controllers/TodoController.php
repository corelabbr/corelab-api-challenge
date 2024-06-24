<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todos = Todo::get();

        return response()->json($todos, 200);
    }

    /**
     * Store a newly created resource in storage.
     */

     public function store(Request $request)
     {
         $validatedData = $request->validate([
             'title' => 'required|string|max:120',
             'description' => 'required|string',
             'favorite' => 'boolean',
             'color' => 'string|nullable'
         ]);
     
         $createdTodo = Todo::create($validatedData);
     
         return response()->json($createdTodo, 201);
     }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $todoToBeFound = Todo::find($id);

        if(!$todoToBeFound)
        {
            return response()->json('Item não encontrado.', 404);
        }

        return response()->json($todoToBeFound, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'favorite' => 'sometimes|boolean',
            'color' => 'sometimes|string|nullable'
        ]);
    
        $todoToBeUpdated = Todo::find($id);
    
        if (!$todoToBeUpdated) {
            return response()->json(['message' => 'item não encontrado.'], 404);
        }
    
        $todoToBeUpdated->update($validatedData);

        return response()->json($todoToBeUpdated, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $todoToBeDeleted = Todo::find($id);

        if (!$todoToBeDeleted) {
            return response()->json(['message' => 'item não encontrado.'], 404);
        }

        $todoToBeDeleted->delete();
        return response()->json('Item deletado com sucesso', 200);
    }
}
