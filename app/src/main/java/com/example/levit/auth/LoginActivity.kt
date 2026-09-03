package com.example.levit.auth

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.levit.databinding.ActivityLoginBinding

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Ação de voltar na seta de texto
        binding.textVoltar.setOnClickListener {
            finish()
        }

        binding.tvRedefinir.setOnClickListener {
            startActivity(Intent(this, RecuperarSenhaActivity::class.java))
        }

        // Tela de login ainda não integrada a um back-end, mexer dps
        binding.btnEntrar.setOnClickListener {
            Toast.makeText(this, "Login em desenvolvimento", Toast.LENGTH_SHORT).show()
        }

        binding.tvRegistrar.setOnClickListener {
            startActivity(Intent(this, CadastroActivity::class.java))
        }
    }
}
