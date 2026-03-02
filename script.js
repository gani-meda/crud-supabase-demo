const supabaseUrl = 'https://oozjuadzrmemwdzdhigw.supabase.co'
const supabaseKey = 'sb_secret_fXh7fOAPuJNCIH9G5NYFww_utadhr8u'

const { createClient } = supabase
const db = createClient(supabaseUrl, supabaseKey)

// Load data saat halaman dibuka
document.addEventListener("DOMContentLoaded", loadData)

async function loadData() {
    const { data, error } = await db
        .from('Coba')
        .select('*')
        .order('id', { ascending: false })

    const table = document.getElementById('data-table')
    table.innerHTML = ''

    data.forEach(row => {
        table.innerHTML += `
            <tr>
                <td>${row.id}</td>
                <td>${row.nama}</td>
                <td>${new Date(row.created_at).toLocaleString()}</td>
                <td>
                    <button onclick="editData(${row.id}, '${row.nama}')">Edit</button>
                    <button onclick="deleteData(${row.id})">Hapus</button>
                </td>
            </tr>
        `
    })
}

// INSERT
async function insertData() {
    const nama = document.getElementById('nama').value

    if (!nama) return alert("Nama wajib diisi")

    await db.from('coba').insert([{ nama }])

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
