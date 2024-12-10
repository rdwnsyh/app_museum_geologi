<!DOCTYPE html>
<html>
<head>
    <title>Kelola Koleksi</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
            text-align: left;
        }
    </style>
</head>
<body>
    <h2>Data Kelola Koleksi</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nama Koleksi</th>
                <th>Tipe BMN</th>
                <th>Alamat Penemuan</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($data as $item)
                <tr>
                    <td>{{ $item->id }}</td>
                    <td>{{ $item->nama_koleksi }}</td>
                    <td>{{ $item->tipe_bmn }}</td>
                    <td>{{ $item->alamat }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
