<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Person;
use Illuminate\Support\Facades\Validator;

class PersonController extends Controller
{

    public function index()
    {
        try {

            return Person::get();

        } catch (\Throwable $th) {

            return response()->json([
                'msg' => 'Não foi possível exibir a lista de temas',
                'Error' => $th

            ], 400);
        }
    }


    public function show($id)
    {   
        try {

            if (!Person::find($id))
            {
                return response()->json([
                    'msg' => 'Pessoa não encontrada',
                ], 404);
            }

            return Person::find($id); 

        } catch (\Throwable $th) {

            return response()->json([
                'msg' => 'Não foi possível exibir a pessoa',
                'Error' => $th->getMessage()
            ], 400);
        }
    }


    public function store(Request $request)
    {   

        try {

            Validator::make($request->all(), [
                'name' => 'required', 'string', 'max:255',    
                'age' => 'required', 'integer', 
            ])->validate();
    
            $person = Person::create([
                'name' => $request['name'],
                'age' => $request['age']
            ]);
            
            return response()->json([
                'msg' => 'Pessoa cadastrada com sucesso'
            ]);

        } catch (\Throwable $th) {
            
            return response()->json([
                'msg' => 'Não foi possível cadastrar a pessoa',
                'Error' => $th->getMessage()
            ], 400);
        }
    }

    
    public function update(Request $request, $id)
    { 

        try {

            $person = Person::find($id);

            if(!$person)
            {
                return response()->json([
                    'msg' => 'Pessoa não encontrada',
                ], 404);
            }

           Validator::make($request->all(), [
                'name' => 'required', 'string', 'max:255',    
                'age' => 'required', 'integer',
            ])->validate();

            $person->forceFill([
                'name' => $request['name'],
                'age' => $request['age']
            ])->save();

            return response()->json([
                'msg' => 'Pessoa atualizada com sucesso'
            ], 200);

        } catch (\Exception $th) {

            return response()->json([
                'msg' => 'Não foi possível atualizar a pessoa',
                'Error' => $th->getMessage()
            ], 400);
        }
    }


    public function destroy($id)
    {   
        try {
            
            $person = Person::find($id);            

            if (!$person)
            {
                return response()->json([
                    'msg' => 'Não foi possível remover a pessoa'
                ], 400);
                
            }
            
            $person->delete();

            return response()->json([
                'msg' => 'Pessoa removida com sucesso'
            ], 200);

        } catch (\Exception $th) {

            return response()->json([
                'msg' => 'Não foi possível remover a pessoa',
                'Error' => $th->getMessage()
            ], 400);
        }
    }
   
}
