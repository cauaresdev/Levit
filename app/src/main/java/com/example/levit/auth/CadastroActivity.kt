package com.example.levit.auth

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.levit.databinding.ActivityCadastroBinding

class CadastroActivity : AppCompatActivity() {

    private lateinit var binding: ActivityCadastroBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCadastroBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Ação de clique no texto da seta
        binding.textVoltar.setOnClickListener {
            finish() // Fecha a tela atual e volta para a anterior
        }

        // Tela de cadastro ainda não integrada a um back-end, mexer dps
        binding.btnCriarConta.setOnClickListener {
            Toast.makeText(this, "Cadastro efetuado", Toast.LENGTH_SHORT).show()
        }

        binding.tvFacaLogin.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
        }
    }
}
