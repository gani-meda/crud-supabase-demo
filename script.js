const supabaseUrl = 'https://oozjuadzrmemwdzdhigw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vemp1YWR6cm1lbXdkemRoaWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzODg1NzEsImV4cCI6MjA4Nzk2NDU3MX0.4kTDKErml18tVJK6zY4dmgyCvdbgFkwbcBrrLa9ijZ8'

const { createClient } = supabase
const db = createClient(supabaseUrl, supabaseKey)

// Load data saat halaman dibuka
document.addEventListener("DOMContentLoaded", loadData)

async function loadData() {
    console.log("Load data dijalankan...")

    const { data, error } = await db
        .from('Coba')
        .select('*')
        .order('id', { ascending: false })

    console.log("DATA:", data)
    console.log("ERROR:", error)

    if (error) {
        alert("Error: " + error.message)
        return
    }

    const table = document.getElementById('data-table')
    table.innerHTML = ''

    data.forEach(row => {
        table.innerHTML += `
            <tr>
                <td>${row.id}</td>
                <td>${row.nama}</td>
                <td>${new Date(row.created_at).toLocaleString()}</td>
            </tr>
        `
    })
}

// INSERT
async function insertData() {
    const nama = document.getElementById('nama').value

    if (!nama) return alert("Nama wajib diisi")

    await db.from('Coba').insert([{ nama }])

    document.getElementById('nama').value = ''
    loadData()
}

// DELETE
async function deleteData(id) {
    await db.from('Coba').delete().eq('id', id)
    loadData()
}

// UPDATE
async function editData(id, oldNama) {
    const newNama = prompt("Edit Nama:", oldNama)
    if (!newNama) return

    await db.from('Coba')
        .update({ nama: newNama })
        .eq('id', id)

    loadData()
}
