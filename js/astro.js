const container = document.getElementById('card-col');
const select_month = document.getElementById('select');
const key = "ZHplkQtNXGbbClKhZykVBvAdgUqWSpz93hadavaw";

const loader = `
  <div class="loader-container mt-5" style="margin:0 auto">
    
  </div>`;

const date = new Date();
const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const monthStart = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;

asyncCall(monthStart, today);

select_month.addEventListener('input', () => {
  const selectedMonth = select_month.value;
  if (selectedMonth > '0') {
    const year = new Date().getFullYear();
    const month = selectedMonth.padStart(2, '0');
    const lastDay = getLastDayOfMonth(year, selectedMonth);
    const firstDay = `${year}-${month}-01`;
    const endDay = `${year}-${month}-${lastDay}`;
    asyncCall(firstDay, endDay);
  }
});

function getLastDayOfMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

async function asyncCall(firstDay, lastDay) {
  container.innerHTML = loader;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${key}&start_date=${firstDay}&end_date=${lastDay}`;
  // const url = `https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    generateHTML(data);
  } catch (err) {
    container.innerHTML = `<h3 class="text-center mt-5 text-danger">Error fetching data. Please try again later.</h3>`;
    console.error(err);
  }
}

function generateHTML(data) {
  let html = "";

  if (Array.isArray(data)) {
    data.reverse().forEach(result => {
      const shortText = result.explanation.substring(0, 150);
      const fullText = result.explanation.replace(/["']/g, "&quot;"); // safer for inline JS

      if (result.media_type === "image") {
        html += `
          <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm">
              <img 
                src="${result.url}" 
                class="card-img-top" 
                alt="${result.title}"
                style="cursor:pointer"
                onclick="openImageModal('${result.url}', '${result.title.replace(/'/g, "\\'")}', '${(result.hdurl || result.url).replace(/'/g, "\\'")}')"
              >
              <div class="card-body">
                <h5 class="card-title">${result.title}</h5>
                <p class="card-text">${shortText}...</p>
                <p class="card-text"><small class="text-muted">${result.date}</small></p>
                <button class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#explanationModal" onclick="showFullExplanation(\`${result.explanation.replace(/`/g, "\\`")}\`)">Read More</button>
                <a href="${result.hdurl || result.url}" target="_blank" class="btn btn-sm btn-primary">Download HD</a>
              </div>
            </div>
          </div>`;
      } else if (result.media_type === "video") {
        html += `
          <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm">
              <iframe src="${result.url}" class="card-img-top" frameborder="0" allowfullscreen></iframe>
              <div class="card-body">
                <h5 class="card-title">${result.title}</h5>
                <p class="card-text">${shortText}...</p>
                <p class="card-text"><small class="text-muted">${result.date}</small></p>
                <button class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#explanationModal" onclick="showFullExplanation(\`${result.explanation.replace(/`/g, "\\`")}\`)">Read More</button>
              </div>
            </div>
          </div>`;
      }
    });
  } else {
    html = `<h3 class="text-center text-danger">No data available for selected month.</h3>`;
  }

  container.innerHTML = `<div class="row">${html}</div>`;
}


function openImageModal(url, title, downloadUrl) {
  document.getElementById('modalImage').src = url;
  document.getElementById('imageModalLabel').innerText = title;

  const downloadBtn = document.getElementById('modalDownloadBtn');
  downloadBtn.onclick = function () {
    window.open(downloadUrl, '_blank');
  };

  const modal = new bootstrap.Modal(document.getElementById('imageModal'));
  modal.show();
}

function showFullExplanation(text) {
  document.getElementById('modalExplanationText').innerText = text;
}


