const studioEnv = {
  HOME: "{{path.resolve(cwd, 'app')}}",
  USERPROFILE: "{{path.resolve(cwd, 'app')}}"
}

const venv = "{{args && args.venv ? args.venv : '../env'}}"
const venvPython = "{{args && args.venv_python ? args.venv_python : '3.12'}}"
const appPath = "{{args && args.path ? args.path : 'app'}}"
const torchPackages = "\"torch>=2.4,<2.11.0\" \"torchvision<0.26.0\" \"torchaudio<2.11.0\""
const rocmTag = "{{args && args.rocm ? args.rocm : 'rocm6.3'}}"

module.exports = {
  run: [
    {
      when: "{{gpu === 'nvidia' && platform === 'win32'}}",
      method: "shell.run",
      params: {
        venv,
        venv_python: venvPython,
        path: appPath,
        env: studioEnv,
        message: [
          `uv pip install --force-reinstall --no-deps ${torchPackages} --index-url https://download.pytorch.org/whl/cu128`
        ]
      },
      next: null
    },
    {
      when: "{{gpu === 'nvidia' && platform === 'linux'}}",
      method: "shell.run",
      params: {
        venv,
        venv_python: venvPython,
        path: appPath,
        env: studioEnv,
        message: [
          `uv pip install --force-reinstall --no-deps ${torchPackages} --index-url https://download.pytorch.org/whl/cu128`
        ]
      },
      next: null
    },
    {
      when: "{{gpu === 'amd' && platform === 'win32'}}",
      method: "shell.run",
      params: {
        venv,
        venv_python: venvPython,
        path: appPath,
        env: studioEnv,
        message: "uv pip install --force-reinstall torch torch-directml torchaudio torchvision numpy==1.26.4"
      },
      next: null
    },
    {
      when: "{{gpu === 'amd' && platform === 'linux'}}",
      method: "shell.run",
      params: {
        venv,
        venv_python: venvPython,
        path: appPath,
        env: studioEnv,
        message: [
          `uv pip install --force-reinstall --no-deps ${torchPackages} --index-url https://download.pytorch.org/whl/${rocmTag}`
        ]
      },
      next: null
    },
    {
      when: "{{platform === 'darwin' && arch === 'arm64'}}",
      method: "shell.run",
      params: {
        venv,
        venv_python: venvPython,
        path: appPath,
        env: studioEnv,
        message: [
          `uv pip install --force-reinstall --no-deps ${torchPackages} --index-url https://download.pytorch.org/whl/cpu`
        ]
      },
      next: null
    },
    {
      when: "{{platform === 'darwin' && arch !== 'arm64'}}",
      method: "shell.run",
      params: {
        venv,
        venv_python: venvPython,
        path: appPath,
        env: studioEnv,
        message: [
          "uv pip install --force-reinstall --no-deps torch==2.2.2 torchvision==0.17.2 torchaudio==2.2.2 --index-url https://download.pytorch.org/whl/cpu"
        ]
      },
      next: null
    },
    {
      method: "shell.run",
      params: {
        venv,
        venv_python: venvPython,
        path: appPath,
        env: studioEnv,
        message: [
          `uv pip install --force-reinstall --no-deps ${torchPackages} --index-url https://download.pytorch.org/whl/cpu`
        ]
      }
    }
  ]
}
